import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";

import { Button } from "~/components/ui/button";
import { Form as RemixForm } from "@remix-run/react";
import { Input } from "~/components/ui/input";
import { lookup } from 'country-data-list';
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react";
import { Label } from "~/components/ui/label";
import { mapValue } from "~/lib/utils";
import { formatPhoneNumber } from "react-phone-number-input";


export default function ConfirmStep({ formHiddenInputs, data, isLoading, joinType, step, participantType }: { formHiddenInputs: { [key: string]: number | string; }, data: any, isLoading: boolean, joinType: string, step: number; participantType: "delegate" | "advisor" }) {
  const year = new Date().getFullYear()
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)

  return (
    <RemixForm method="POST" className="space-y-16">
      <h1 className="text-3xl">
        Confirmar Dados
      </h1>

      <div className="space-y-4">
        <h3>
          Informações de acesso
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "E-mail", value: data.email },
            { key: "Nome", value: data.name },
          ].map((item: any, idx) => (
            <div key={idx}><Input readOnly value={item.value} /></div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3>
          Informações pessoais
        </h3>

        <div className="grid grid-cols-2 gap-4">
          {[
            { key: "sex", value: mapValue(data.sex) },
            { key: "Nome Social", value: data.socialName },
            { key: "Telefone", value: formatPhoneNumber(data.phoneNumber) },
            { key: "Data de Nascimento", value: new Date(data.birthDate).toLocaleDateString() },
            { key: "Nacionalidade", value: lookup.countries({ alpha3: data.nationality })[0]?.name },
            { key: "RG", value: data.rg },
            { key: "CPF", value: data.cpf },
            { key: "Passaporte", value: data.passport },
            { key: "Dieta", value: mapValue(data.diet) },
            { key: "RestriçÕes Alimentares", value: data.foodRestriction },
          ].map((item: any, idx) => (
            item.value ? <div key={idx}><Input readOnly value={item.value} /></div> : null
          ))}
        </div>
      </div>

      {participantType === "delegate" ?
        <>
          <div className="space-y-4">
            <h3>
              Dados de Delegado
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "Nível de Escolaridade", value: mapValue(data.educationLevel) },
                { key: "Ano em que está cursando", value: data.currentYear },
                { key: "Idiomas que pode simular", value: data.languagesSimulates.map((v: any) => mapValue(v)).join(", ") },
              ].map((item: any, idx) => (
                <div key={idx}><Input readOnly value={item.value} /></div>
              ))}
            </div>

            <div>Contato de Emergência</div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "Nome", value: data.emergencyContactName },
                { key: "Telefone", value: formatPhoneNumber(data.emergencyContactPhoneNumber) },
              ].map((item: any, idx) => (
                <div key={idx}><Input readOnly value={item.value} /></div>
              ))}
            </div>
          </div>
        </>
        :
        <>
          <div className="space-y-4">
            <h3>
              Dados de Advisor
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "Escola/Universidade", value: mapValue(data.advisorRole) },
                { key: "Facebook", value: data.facebook },
                { key: "Instagram", value: data.instagram },
                { key: "Linkedin", value: data.linkedin },
              ].map((item: any, idx) => (
                item.value ? <div key={idx}><Input readOnly value={item.value} /></div> : null
              ))}
            </div>
          </div>
        </>
      }

      {joinType === "create" ?
        <>
          <div className="space-y-4">
            <h3>
              Delegação
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "Escola/Universidade", value: data.school },
                { key: "Tipo de Delegação", value: mapValue(data.participationMethod) },
                { key: "Telefone", value: formatPhoneNumber(data.delegationPhoneNumber) },
                { key: "Endereço", value: data.address.address },
                { key: "Cidade", value: data.address.city },
                { key: "Código Postal", value: data.address.postalCode },
                { key: "Estado", value: data.address.state },
                { key: "País", value: lookup.countries({ alpha3: data.address.country })[0]?.name || undefined },
              ].map((item: any, idx) => (
                <div key={idx}><Input readOnly value={item.value} /></div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3>
              Quantidade de Participantes
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "Número de Delegados", value: data.maxDelegates },
                { key: "Número de Advisors", value: data.maxAdvisors },
              ].map((item: any, idx) => (
                <div key={idx}>
                  <Label>{item.key}</Label>

                  <Input readOnly value={item.value} />
                </div>
              ))}
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Aviso!</AlertTitle>
              <AlertDescription>
                A quantidade de participantes não poderá ser alterada depois!
              </AlertDescription>
            </Alert>
          </div>
        </>
        :
        <>
          <div className="space-y-4">
            <h3>
              Entrando na Delegação
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                { key: "Tipo de Delegação", value: mapValue(data.participationMethod) || undefined },
                { key: "Escola/Universidade", value: data.school || undefined },
                { key: "Código", value: data.code || undefined },
              ].map((item: any, idx) => (
                <div key={idx}><Input readOnly value={item.value} /></div>
              ))}
            </div>
          </div>
        </>
      }



      {/* values necessary for the multi step form */}
      <input type="hidden" name="step" value={step} />
      {Object.entries(formHiddenInputs).map(([key, value], index) => (
        <input key={index} type="hidden" name={key} value={value} />
      ))}

      <div className="flex flex-col">
        <Button type="submit" disabled={isLoading} name="action" value="next" size="xl" onClick={setButtonClicked}>
          {showLoadingSpinner && <Loader2 className="animate-spin" />} Confirmar
        </Button>
      </div>
    </RemixForm>
  )
}
