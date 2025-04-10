import React from 'react'
import { Form, Link, useSearchParams } from '@remix-run/react'
import { useOptionalUser } from "~/lib/utils"

import { LogOut } from 'lucide-react'
import { Button } from '~/components/ui/button'


interface Navbar {
  admin?: boolean
}


export default function Navbar({ admin }: Navbar) {
  const user = useOptionalUser()
  const [searchParams] = useSearchParams();
  const searchParamsString = searchParams.toString();
  const queryString = searchParamsString ? `?${searchParamsString}` : "";
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <div
      className={`
        fixed top-0 w-screen px-[5%] sm:px-[10%] 
        bg-background 
        transition-all duration-200 z-50 ${scrolled ? 'py-4 shadow-[0px_1px_0px_0px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_hsla(0,0%,100%,.03)_inset,0px_0px_0px_1px_rgba(0,0,0,.1),0px_2px_2px_0px_rgba(0,0,0,.1),0px_4px_4px_0px_rgba(0,0,0,.1),0px_8px_8px_0px_rgba(0,0,0,.1)]' : 'py-8'}
      `}
    >
      <div className="flex justify-between items-center">
        <Link to={`${user ? "/dashboard" : "/"}${queryString}`} className="text-3xl">
          FAMUN {new Date().getFullYear()}
        </Link>

        <div className='flex gap-6 items-center'>
          <div>
            Ajuda
          </div>

          {(user || admin) &&
            <Form action='/logout' method='POST' reloadDocument>
              <Button variant="link" className='text-foreground px-0' type='submit'>
                <LogOut /> Sair
              </Button>
            </Form>
          }
        </div>
      </div>
    </div>
  )
}