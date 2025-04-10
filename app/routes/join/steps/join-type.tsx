import { Button } from "~/components/ui/button";
import { Form as RemixForm } from "@remix-run/react";
import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";
import { Loader2 } from "lucide-react";


export default function JoinTypeStep({ formHiddenInputs, isLoading, step }: { formHiddenInputs: { [key: string]: number | string; }, isLoading: boolean, step: number }) {
  const { show: showCreateLoadingSpinner, setButtonClicked: setCreateButtonClicked } = useShowLoadingSpinner(isLoading)
  const { show: showJoinLoadingSpinner, setButtonClicked: setJoinButtonClicked } = useShowLoadingSpinner(isLoading)

  return (
    <RemixForm method="POST" className="space-y-16">
      <h1 className="text-3xl">
        Escolha sua Opção
      </h1>

      {/* values necessary for the multi step form */}
      <input type="hidden" name="action" value="next" />
      <input type="hidden" name="step" value={step} />
      {Object.entries(formHiddenInputs).map(([key, value], index) => (
        <input key={index} type="hidden" name={key} value={value} />
      ))}

      <div className="flex flex-col gap-4">
        <Button type="submit" disabled={isLoading} variant="outline" name="joinType" value="create" size="xl" onClick={setCreateButtonClicked}>
          {showCreateLoadingSpinner && <Loader2 className="animate-spin" />} Criar nova Delegação
        </Button>

        <Button type="submit" disabled={isLoading} variant="outline" name="joinType" value="join" size="xl" onClick={setJoinButtonClicked}>
          {showJoinLoadingSpinner && <Loader2 className="animate-spin" />} Entrar em uma Delegação
        </Button>
      </div>
    </RemixForm>
  )
}
