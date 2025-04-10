import { CheckCircle2Icon } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { IntroDisclosure } from '~/components/ui/intro-disclosure'


const steps = [
  {
    title: "Primeiros passos",
    short_description: "Para iniciar a inscrição, você precisa criar uma conta",
    full_description:
      "Crie uma conta e preencha com suas informações pessoais para realizar o cadastro.",
    media: {
      type: "image" as const,
      src: "/images/Tutorial1.png",
      alt: "",
    },
  },
  {
    title: "Delegação",
    short_description: "Entrar ou criar em uma delegação",
    full_description:
      "Para criar uma delegação preencha com as informações da sua escola/universidade, para entrar em uma delegação você precisa pedir um código de acesso ou um link para quem já está na delegação. Se você já veio pelo link, não se preocupe, já está tudo certo!",
    media: {
      type: "image" as const,
      src: "/images/Tutorial2.png",
      alt: "",
    }
  },
  {
    title: "Pagamentos",
    short_description: "Pagar todas as taxas de inscrição para sua delegação.",
    full_description:
      "Os pagamentos podem ser realizados individualmente ou em grupo, fica a critério da delegação, para participantes que querem pagar sozinhos é necessário criar uma conta e entrar na delegação",
    media: {
      type: "image" as const,
      src: "/images/Tutorial3.png",
      alt: "",
    },
  },
  {
    title: "Participantes",
    short_description: "Prencher com as informações dos participantes",
    full_description:
      "Quando todos os pagamentos forem concluídos, os dados dos participantes poderão ser preenchidos individualmente ou pelos advisors e líder da delegação, nesse último caso o participante não precisa criar uma conta para participar.",
    media: {
      type: "image" as const,
      src: "/images/Tutorial4.png",
      alt: "",
    },
  },
  {
    title: "Comitês e Conselhos",
    short_description: "Por último, escolher as preferências dos delegados",
    full_description:
      "Por fim, são preenchidas as preferências dos delegados de comitês/conselhos em que eles iram participar",
    media: {
      type: "image" as const,
      src: "/images/Tutorial5.png",
      alt: "",
    },
  },
]


interface Tutorial {
  step: number
}


export default function Tutorial({ step }: Tutorial) {
  const { isTutorialDialogOpen, setIsTutorialDialogOpen } = useTutorialDialog(step)

  return (
    <IntroDisclosure
      open={isTutorialDialogOpen}
      setOpen={setIsTutorialDialogOpen}
      steps={steps}
      featureId="intro-famun"
      onComplete={() => toast.success("Tutorial finalizado!", { icon: <CheckCircle2Icon className="text-primary" /> })}
      onSkip={() => toast.info("Tutorial pulado", { icon: <CheckCircle2Icon className="text-primary" /> })}
    />
  )
}


function useTutorialDialog(step: number) {
  const [isTutorialDialogOpen, setIsTutorialDialogOpen] = React.useState(false)

  React.useEffect(() => {
    if (step === 1) {
      setIsTutorialDialogOpen(true)
    }
  }, [])

  return { isTutorialDialogOpen, setIsTutorialDialogOpen }
}