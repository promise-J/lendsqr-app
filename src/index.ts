import makeApp from "./server"
import * as dotenv from 'dotenv'
dotenv.config()


const app = makeApp()



const port = process.env.PORT || 5000
app.listen(port, (): void =>{
    console.log('Server is running')
})

export default app
