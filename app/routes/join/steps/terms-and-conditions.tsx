import { Form as RemixForm } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import { useShowLoadingSpinner } from "../utils/use-show-loading-spinner";


export default function TermsAndConditionsStep({ formHiddenInputs, isLoading, step }: { formHiddenInputs: { [key: string]: number | string; }, isLoading: boolean, step: number }) {
  const year = new Date().getFullYear()
  const { show: showLoadingSpinner, setButtonClicked } = useShowLoadingSpinner(isLoading)

  return (
    <RemixForm method="POST" className="space-y-16">
      <h2 className="text-3xl">
        Termos e Condições
      </h2>

      <ScrollArea className="h-64 overflow-scroll">
        <b>TERMOS E CONDIÇÕES DE PARTICIPAÇÃO NO FAMUN {year}</b><br />

        Delegados(as) e Professores Orientadores reconhecem e declaram estar de acordo com os seguintes termos e condições de participação no
        FAMUN {year}:
        <br />
        <br />

        <b>Inscrições</b><br />
        Ensino Médio: para garantir a maior diversidade de participantes no FAMUN {year}, cada escola poderá inscrever uma única delegação de no
        máximo 10 alunos(as).
        <br />
        Universidade: cada universidade poderá inscrever delegações de no máximo 10 alunos(as). Não há limite no número de delegações para
        universidade.
        <br />
        As vagas são limitadas e, por isso, as inscrições serão confirmadas por ordem de inscrição. Caso as vagas se encerrem, a equipe
        organizadora do FAMUN {year} abrirá uma lista de espera.
        <br />
        As escolas em lista de espera terão sua inscrição confirmada apenas se houver desistência de outras delegações.
        <br />
        Caso necessário, a equipe organizadora do FAMUN {year} poderá enviar uma carta convite para confirmar a participação da
        escola/universidade no evento.
        <br />
        <br />

        <b>Pagamentos</b><br />
        Todos os pagamentos deverão ser feitos em até 5 dias úteis após a submissão da inscrição. Caso os pagamentos não sejam realizados
        nesse período, a inscrição será cancelada e a escola/universidade deverá realizar uma nova inscrição caso deseje participar da
        conferência. A nova inscrição dependerá da disponibilidade de vagas.
        <br />

        Os pagamentos nacionais devem ser feitos via PIX, cartão de crédito ou débito. Pagamentos internacionais devem ser feitos por PayPal.
        <br />

        O FAMUN {year} não realiza reembolso ou ressarcimento das taxas de inscrição, sob nenhuma circunstância.
        <br />
        <br />

        <b>Professores Orientadores</b><br />
        Ensino Médio: para inscrever a delegação de uma escola no FAMUN {year}, é obrigatório inscrever ao menos a um(a) professor(a)
        orientador(a). Tal professor(a) deve ser um adulto responsável dentro das seguintes opções: professor; pais; adulto legalmente
        responsável pelos estudantes.
        <br />
        É obrigatória a presença do(a) professor(a) orientador(a) em todos os dias de conferência, acompanhando a delegação. É permitido um
        número máximo de 3 (três) professores orientadores por delegação de ensino médio.
        <br />
        Universidade: a presença de professores orientadores é opcional.
        <br />
        <br />

        <b>Autorização e Termo de Responsabilidade (Liability Waiver)</b><br />
        Para participar do FAMUN {year}, cada participante deverá assinar o documento Autorização e Termo de Responsabilidade (Liability Waiver)
        e anexá-lo no sistema de inscrições até 23 de agosto de {year}.
        <br />
        Esse documento dá ao FAMUN e à FACAMP o direito de coletar e utilizar as informações submetidas pelos(as) participantes do FAMUN {year},
        bem como conteúdo de mídia em formato de fotografia e vídeo durante as atividades da conferência.
        <br />
        Para estudantes de Ensino Médio, a autorização deverá ser assinada pelos pais ou guardiões legais.
        <b>Atenção: esse documento deverá ter a assinatura reconhecida em cartório.</b>
        <br />
        Caso o(a) estudante não entregue esse documento, não poderá participar de nenhuma atividade do FAMUN {year}.
        <br />
        <br />

        <b>Conduta durante as sessões e atividades do FAMUN {year}</b><br />
        A equipe organizadora do FAMUN {year} é responsável por garantir um ambiente diplomático e respeitoso a todos(as) os(as) participantes
        da conferência. O FAMUN se reserva ao direito de suspender imediatamente os(as) participantes devido à má-conduta, que inclui (mas não
        se limita) as seguintes ações:
        <ul>
          <li>
            Qualquer ação relacionada à conferência que viole os direitos legais dos demais participantes, como racismo, difamação, assédio, ameaça
            ou qualquer outro comportamento impróprio;
          </li>
          <li>
            Consumo ou posse de álcool ou drogas ilícitas; e consumo de cigarro e tabaco em locais não apropriados;
          </li>
          <li>
            Enviar ou compartilhar conteúdo inapropriado ou que possa prejudicar a operação do computador de outro participante, como por exemplo
            arquivos contendo vírus;
          </li>
          <li>
            Fornecer informações pessoais falsas;
          </li>
          <li>
            Personificar outro participante, o que inclui (mas não se limita) a fazer o login com o nome de outros participantes;
          </li>
          <li>
            Qualquer ação que viole os protocolos contra a COVID-19.</li>
        </ul>
        <br />

        <b>Código de vestimenta</b><br />
        Os(as) participantes deverão usar trajes formais durante as atividades do FAMUN {year}. Vestimentas nacionais ou tradicionais serão
        permitidas contanto que respeitem a formalidade do evento. Os(as) participantes não devem portar vestimentas que possam ser consideradas
        desrespeitosas ou inapropriadas.
        <br />
        <br />

        <b>Certificados</b><br />
        Os certificados de participação serão emitidos apenas para os(as) participantes que tiveram 75% de presença nas sessões de simulação
        (ou seja, que participaram de 6 das 7 sessões). Os certificados serão disponibilizados por email até outubro de {year}.
        <br />
        <br />

        <b>Plágio</b><br />
        Os(as) participantes concordam que todos os materiais produzidos para o FAMUN {year} (como discursos, position papers, emendas, dentre
        outros) serão trabalhos originais. O plágio não será tolerado na FAMUN {year} e, caso a Comissão Organizadora verifique casos de plágio,
        o FAMUN reserva o direito de suspender a participação do(a) delegado(a), sem reembolso.
        <br />
        <br />

        <b>Política de suspensão</b><br />
        Caso os(as) participantes não cumpram alguma das instruções apresentadas nesses termos e condições de participação do FAMUN {year},
        incluindo os protocolos contra a COVID-19, a Comissão Organizadora se reserva ao direito de suspender imediatamente os(as) participantes,
        sem reembolso.
        <br />
        <br />

        <b>Protocolo contra a COVID-19</b><br />
        Para garantir a segurança e bem-estar de todos os participantes, o FAMUN recomenda fortemente as seguintes medidas para evitar o
        contágio por COVID-19:
        <ul>
          <li>Usar máscara PFF2/N95/KN95 em espaços fechados;</li>
          <li>Estar atualizado com as doses de vacina contra COVID-19;</li>
          <li>Notificar imediatamente a organização do FAMUN em caso de sintomas e permanecer em casa caso você tenha algum sintoma.</li>
        </ul>
        <br />

        Observação: a realização do formato presencial do FAMUN {year} ocorrerá apenas se as condições sanitárias nacionais, estaduais e
        municipais forem adequadas para a realização do evento. Caso tais condições não sejam adequadas, o FAMUN {year} se dá ao direito de
        tornar as recomendações acima obrigatórias ou transferir as simulações para o formato online. Os participantes serão notificados de uma
        possível mudança no protocolo contra COVID-19 ou no formato da conferência com até 15 dias de antecedência à realização do FAMUN {year}.
        Caso a delegação não deseje mais participar, não haverá reembolso das taxas de inscrição sob nenhuma circunstância.
        <br />
        <br />

        <b>Exceções</b><br />
        A Comissão Organizadora do FAMUN {year} é a única com o poder de abrir exceções a essas políticas gerais. Requisições de exceções devem
        ser enviadas por escrito para o e-mail famun@facamp.com.br.
      </ScrollArea>

      {/* values necessary for the multi step form */}
      <input type="hidden" name="step" value={step} />
      {Object.entries(formHiddenInputs).map(([key, value], index) => (
        <input key={index} type="hidden" name={key} value={value} />
      ))}

      <div className="flex flex-col">
        <Button type="submit" name="action" value="next" disabled={isLoading} size="xl" onClick={setButtonClicked}>
          {showLoadingSpinner && <Loader2 className="animate-spin" />} Aceitar
        </Button>
      </div>
    </RemixForm>
  )
}
