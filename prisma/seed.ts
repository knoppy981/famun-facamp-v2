import { faker } from "@faker-js/faker";
import { PrismaClient, User } from "@prisma/client";

import bcrypt from "bcryptjs";

const participantTypes = ['delegate', 'advisor'] as const;
const sexTypes = ['masc', 'fem', 'other'] as const;

const prisma = new PrismaClient();

async function seed() {
  /*   await prisma.user.deleteMany();
    await prisma.delegation.deleteMany();
  
    function generateDate() {
      let currentDate = new Date();
      let newDate = new Date(currentDate.setDate(currentDate.getDate() + 7));
      return newDate
    }
  
    await prisma.delegation.create({
      data: {
        school: "Colegio de Campinas",
        phoneNumber: "+5519967896789",
        participationMethod: "school",
        code: "123456",
        inviteLink: "http://localhost:5173/join?jwt=",
        maxAdvisors: 3,
        maxDelegates: 10,
        paymentExpirationDate: generateDate(),
  
        address: {
          address: "Avenida Brasil 100",
          city: "Campinas",
          country: "Brasil",
          postalCode: "13100666",
          state: "SP"
        },
  
        users: {
          create: await createUser("André Knopp Guimarães", "andre.knopp8@gmail.com", "cus_RprOhFmyWtHfUa"),
        }
      }
    })
  
    await prisma.delegation.create({
      data: {
        school: "Colegio Teste Expirado",
        phoneNumber: "+5519967896789",
        participationMethod: "school",
        code: "112233",
        inviteLink: "http://localhost:5173/join?jwt=",
        maxAdvisors: 3,
        maxDelegates: 10,
        paymentExpirationDate: new Date(2025, 2, 1),
  
        address: {
          address: "Avenida Brasil 100",
          city: "Campinas",
          country: "Brasil",
          postalCode: "13100666",
          state: "SP"
        },
  
        users: {
          create: await createUser("Teste", "teste@gmail.com", "cus_RsMKAYMlcbREkU"),
        }
      }
    }) */
  await prisma.admin.deleteMany().catch((error) => console.log("No admin found!"))

  await prisma.admin.create({
    data: {
      email: "famun@facamp.com.br",
      hash: await bcrypt.hash("Teste123", 10)
    }
  })
}

async function createUser(name?: string, email?: string, stripeCustomerId?: string, delegationCode?: string) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const isBrazilian = Math.random() < 0.5; // 50% chance to be Brazilian
  const nationality = isBrazilian ? 'BRA' : faker.location.countryCode('alpha-3');

  const userData: any = {
    email: email ?? faker.internet.email(),
    name: name ?? `${firstName} ${lastName}`,
    password: {
      create: {
        hash: await bcrypt.hash("asdasdasd", 10)
      }
    },
    stripeCustomerId: stripeCustomerId ?? "",

    type: faker.helpers.arrayElement(participantTypes),
    sex: faker.helpers.arrayElement(sexTypes),
    socialName: Math.random() > 0.8 ? faker.person.fullName() : null,
    cpf: isBrazilian ? faker.string.numeric(11) : null,
    rg: isBrazilian ? faker.string.numeric(9) : null,
    passport: !isBrazilian ? faker.string.alphanumeric(8).toUpperCase() : null,
    phoneNumber: faker.phone.number(),
    birthDate: faker.date.birthdate({ min: 16, max: 70, mode: 'age' }),
    nationality: nationality,
    diet: faker.helpers.maybe(() => faker.helpers.arrayElement([
      'vegan',
      'vegetarian',
      'other',
      undefined
    ]), { probability: 0.6 }),
    foodRestriction: null,
  };

  // Add delegation connection only if delegation code is provided
  if (delegationCode) {
    userData.delegation = {
      connect: {
        code: delegationCode
      }
    };
  }

  return userData
}


seed().finally(() => prisma.$disconnect());