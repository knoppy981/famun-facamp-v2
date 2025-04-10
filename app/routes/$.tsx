import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export function loader() {
  return new Response("Not Found", {
    status: 404,
  });
}

export default function NotFoundPage() {
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='space-y-10'>
        <p className='text-5xl'>
          Oops!
        </p>

        <div className='text-3xl'>
          Página não encontrada
        </div>

        <Button asChild variant="link" className="px-0">
          <Link to='/'>Voltar para página inicial</Link>
        </Button>
      </div>
    </div>
  )
}