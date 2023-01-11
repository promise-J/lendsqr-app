import makeApp from "./server"


const app = makeApp()




app.listen(5000, (): void =>{
    console.log('Server is running')
})

export default app
