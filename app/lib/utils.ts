import { useMatches } from "@remix-run/react";
import { clsx, type ClassValue } from "clsx"
import { useMemo } from "react";
import { twMerge } from "tailwind-merge"
import { Delegation } from "~/models/delegation.server";
import { User } from "~/models/user.server";

const DEFAULT_REDIRECT = "/";

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT,
) {
  if (!to || typeof to !== "string") {
    return defaultRedirect;
  }

  if (!to.startsWith("/") || to.startsWith("//")) {
    return defaultRedirect;
  }

  return to;
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data as Record<string, unknown>;
}

export function nullsToUndefined<T>(obj: T): T {
  if (obj === null) return undefined as unknown as T;
  
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  
  const newObj: any = Array.isArray(obj) ? [] : {};
  
  Object.entries(obj).forEach(([key, value]) => {
    if (value === null) {
      // For form inputs that expect strings, provide empty string instead of undefined
      if (['socialName', 'cpf', 'rg', 'passport', 'foodRestriction', 'currentYear', 
           'emergencyContactName', 'emergencyContactPhoneNumber', 'facebook', 
           'instagram', 'linkedin'].includes(key)) {
        newObj[key] = "";
      } 
      // For languagesSimulates, ensure it's always an array
      else if (key === 'languagesSimulates') {
        newObj[key] = [];
      }
      // For other fields, use undefined
      else {
        newObj[key] = undefined;
      }
    } else if (typeof value === 'object') {
      newObj[key] = nullsToUndefined(value);
    } else {
      newObj[key] = value;
    }
  });
  
  return newObj as T;
}


function isUser(user: unknown): user is User & { delegation: Delegation } {
  return (
    user != null &&
    typeof user === "object" &&
    "email" in user &&
    typeof user.email === "string" &&
    "delegation" in user &&
    typeof user.delegation === "object"
  );
}

export function useOptionalUser(): User & { delegation: Delegation } | undefined {
  const data = useMatchesData("root");
  if (!data || !isUser(data.user)) {
    return undefined;
  }
  return data.user;
}

export function useUser(): User & { delegation: Delegation } {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const labelMap = {
  // user
  email: { value: "E-mail", end: "o" },
  name: { value: "Nome", end: "o" },
  password: { value: "Senha", end: "a" },
  confirmPassword: { value: "Senha", end: "a" },
  socialName: { value: "Nome social", end: "o" },
  phoneNumber: { value: "Telefone", end: "o" },
  birthDate: { value: "Data de nascimento", end: "o" },
  sex: { value: "Sexo", end: "o" },

  // delegate
  councilPreference: { value: "Preferência de conselho", end: "a" },
  languagesSimulates: { value: "Idiomas que pode simular", end: "o" },
  educationLevel: { value: "Nível de escolaridade", end: "o" },
  currentYear: { value: "Ano em que está cursando", end: "o" },
  emergencyContactName: { value: "Nome", end: "o" },
  emergencyContactPhoneNumber: { value: "Telefone", end: "o" },

  // advisor
  advisorRole: { value: "Posição do(a) professor(a) orientador(a)", end: "a" },
  facebook: { value: "Facebook", end: "o" },
  instagram: { value: "Instagram", end: "o" },
  linkedin: { value: "Linkedin", end: "o" },

  // delegation
  delegationPhoneNumber: { value: "Telefone", end: "o" },
  school: { value: "Escola/Universidade", end: "a" },
  maxDelegates: { value: "Número de delegados", end: "o" },
  maxAdvisors: { value: "Número de advisors", end: "o" },
  address: { value: "Endereço", end: "o" },
  country: { value: "País", end: "o" },
  nationality: { value: "País", end: "o" },
  postalCode: { value: "Código postal", end: "o" },
  state: { value: "Estado", end: "o" },
  city: { value: "Cidade", end: "a" },

  // payments
  delegatesPayments: { value: "Pagamento dos delegados", end: "o" },
  advisorsPayments: { value: "Pagamento dos advisors", end: "o" },
  coupon: { value: "Código promocional", end: "o" },
} as const;

export function mapLabel(code: string): { value: string, end: string } {
  const mapvalue = labelMap[code as keyof typeof labelMap];
  if (!mapvalue) return { value: "", end: "o" }

  return mapvalue
}

const valueMap = {
  card: "Cartão",
  boleto: "Boleto",
  teacher: "Professor",
  coordinator: "Coordenador",
  principal: "Diretor",
  other: "Outro",
  delegate: "Delegado",
  advisor: "Advisor",
  school: "Escola",
  university: "Universidade",
  prep_school: "Cursinho",
  english: "Inglês",
  portuguese: "Português",
  spanish: "Espanhol",
  masc: "Masculino",
  fem: "Feminino",
  vegan: "Vegano",
  vegetarian: "Vegetariano",
} as const;

export function mapValue(code: string): string | null {
  const mapvalue = valueMap[code as keyof typeof valueMap];
  if (!mapvalue) return null

  return mapvalue
}

export function generateString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  let result = '';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export async function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
