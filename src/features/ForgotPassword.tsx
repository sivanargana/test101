import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
 
import { Link } from 'react-router'


function ForgotPassword() {
  return (
    <>
    <div>
            <div className="text-lg font-bold">Forgot Password</div>
            <div>If you have forgotten your password you can reset it here.</div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex gap-1"><Input placeholder="Email" /> <Button>Send</Button></div>
            <Button asChild variant="link"><Link to="/login">Back to Login</Link></Button>
             
          </div>
    </>

  )
}

export default ForgotPassword