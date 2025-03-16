import Header from "../Shared/Header/Header.jsx";
import category_image from "../../assets/recipe_header.png";
import { Link } from "react-router-dom";

export default function Dashboard() {
    return (
        <>
            <Header
                image={category_image}
                title="Welcome Upskilling !"
                description="This is a welcoming screen for the entry of the application , you can now see the options"
            />
            <div class="container-fluid my-3 py-5 bg-light-green rounded-2">
                <div className="row align-items-center">
                    <div className="col-12 col-md-8">
                        <h3>Fill the Recipes !</h3>
                        <p>you can now fill the meals easily using the table and form , click here and sill it with the table !</p>
                    </div>
                    <div className="col-12 col-md-4 text-md-end mt-3 mt-md-0">
                        <Link to="/dashboard/recipes-List" className="btn btn-success text-white">Fill Recipes</Link>
                    </div>
                </div>
            </div>
        </>
    )
}