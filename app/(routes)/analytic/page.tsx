import { getServerSession } from "next-auth"
import { db } from "@/lib/db"

import { redirect } from "next/navigation"
import { countPassword } from "@/lib/countPassword"
import { RepeatedPasswordChart } from "./components/RepeatedPasswordChart/RepeatedPasswordChart"
import { ViewsAnalyticsChart } from "./components/ViewsAnalyticsChart/ViewsAnalyticsChart"

export default async function AnalitycPage() {

  const session = await getServerSession()

  if (!session || !session.user?.email) {
    return redirect('/')
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email },
    include: {
      elements:{
        orderBy:{
          createdAt: "desc"
        }
      }
    }

  });

  if (!user || !user.elements) {
    return redirect('/')
  }

  const {unique,repeated} = countPassword(user.elements)
 

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-5 mb-4">
        <RepeatedPasswordChart repeated={repeated} unique={unique}/>
        <ViewsAnalyticsChart repeated={repeated} unique={unique}/>
      </div>
      
    </div>
  )
}
