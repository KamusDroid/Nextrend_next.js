interface CategoryProps{

    params:{
        category:string
    }

}


export default function Categrory(props:CategoryProps){
    
    const { category } = props.params

    return(
        <h1>Categroias dinamicas: {category}</h1>
    )
}