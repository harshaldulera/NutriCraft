import Card from '../components/Card.jsx'
const Recipe = (props) => {
    let rec = props.recipe
    
    let resultString
    if (rec.startsWith('```json') && rec.endsWith('```')) {
        resultString = rec.substring('```json'.length, rec.length - '```'.length);}
    let recipe = JSON.parse(resultString)
    console.log(recipe)
    const recipeData = {
        title: "Delicious Recipe",
        description: "A tasty dish you'll love!",
        inglist: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        inslist: ["Step 1: Do something", "Step 2: Do something else", "Step 3: Enjoy!"],
      };
    
    return(
        <div className="bg-secondary-50 relative mx-auto rounded-lg flex mt-5 min-h-[95vh] max-w-6xl flex-col items-center">
            <main className="flex-1">
                <div className="">
                    <section className="mx-auto flex max-w-5xl flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
                    <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">Recipe Name</h1>
                    <h1>Recipe Name</h1>
                    </section>
                    <div className="mx-auto w-full max-w-3xl">
                        <div className="rounded-lg border max-w-5xl">
                            <Card
                             title={recipeData.title}
                             description={recipeData.description}
                             />
                            <div>
                             <h1>Ingredients</h1>
                             <Card
                             inglist={recipeData.inglist}
                             />
                            </div>
                            <div>
                                <h1>Instructions</h1>
                                <Card
                                inslist={recipeData.inslist}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )

}


export default Recipe;

