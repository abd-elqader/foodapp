import {Link, useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import {privteApiInstace} from "../../services/api/apiInstance.js";
import {recipes_endpoints, tags_endpoints} from "../../services/api/apiConfig.js";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {axios_instance_auth, CATEGORIES_URLS} from "../../services/urls/urls.js";


export default function RecipeData() {
        const params =  useParams()
        const recipeId = params.rceipeId;

        const [categories, setCategories] = useState([])
        const [tags, setTags] = useState([])

        let getCategories = async () => {
            try {
                let response = await axios_instance_auth.get(
                    CATEGORIES_URLS.GET_CATEGORIES,{
                    }
                )
                setCategories(response.data.data)
            } catch (e) {
                console.log(e.response.data.message)
            }
        }
        let getTags = async () => {
        try {
            let response = await axios_instance_auth.get(
                tags_endpoints.GET_TAGS,{
                }
            )
            setTags(response?.data?.data)
        } catch (e) {
            console.log(e.response.data.message)
        }
    }

        let {
            register,
            formState: { errors, isSubmitted },
            handleSubmit,
            setValue
        } = useForm();

        let onSubmit = async (data) => {
            try {
                const formData = new FormData();
                // formData.append("name", data.name);
                // formData.append("description", data.description);
                // formData.append("price", data.price);
                // formData.append("tagId", data.tagId);
                // formData.append("categoryId", data.categoryId);
                // formData.append("recipeImage", data.recipeImage);

                for (let key in data) {
                    if (key === "recipeImage"){
                        formData.append(key, data?[key]?.[0]:null);
                    }
                    else {
                        formData.append(key, data[key]);
                    }
                }

                await privteApiInstace.post(
                    recipes_endpoints.POST_RECIPE,
                    formData
                )
                toast.success("category added successfully");

            } catch (e) {
                toast.error("category not added");
                console.log(e)
            }
        }

    useEffect(() => {
        (async () => {
            await getCategories();
            await getTags();

            if(recipeId !== "new-recipe"){
                const getRecipe = async () => {
                    const response = await privteApiInstace.get(recipes_endpoints.GET_RECIPE(recipeId))
                    const  recipe = response?.data;

                    setValue("name",recipe?.name);
                    setValue("description",recipe?.description);
                    setValue("price",recipe?.price);
                    setValue("tagId",recipe?.tagId);
                    setValue("categoryId",recipe?.categoryId[0].id);
                    setValue("recipeImage",recipe?.recipeImage);

                }
                await getRecipe();
            }
        })();
    }, [recipeId,setValue])

    return (
        <>
            <div>
                <main>
                    <header className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center p-4">
                            <div>
                                <h3>Recipe</h3>
                                <p>you can now fill the meals easily using the taale and form,</p>
                            </div>
                            <div>
                                <Link to="/dashboard/recipes" className="btn btn-success">All Recipes</Link>
                            </div>
                        </div>
                    </header>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group mt-3">
                            <input
                                {...register("name")}
                                type="text"
                                className="form-control py-3 my-3"
                                placeholder="Recipe Name"
                            />
                        </div>
                        {errors.name && (
                            <span className="text-danger mt-2">{errors.name.message}</span>
                        )}

                        <div className="input-group mt-3">
                            <input
                                {...register("price")}
                                type="number"
                                className="form-control py-3 my-3"
                                placeholder="Recipe Price"
                            />
                        </div>
                        {errors.price && (
                            <span className="text-danger mt-2">{errors.price.message}</span>
                        )}

                        <div className=' select-category my-2'>
                            <select
                                name="category"
                                id="category"
                                className="form-select"
                                {...register("categoryId")}
                            >
                                {categories?.map(({id,name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className=' select-tag'>
                            <select
                                name="tag"
                                id="tag"
                                className="form-select"
                                {...register("tagId")}
                            >
                                {tags?.map(({id,name}) => (
                                    <option key={id} value={id}>{name}</option>
                                ))}
                            </select>
                        </div>

                        <div className="input-group mt-3">
                            <textarea
                                {...register("description")}
                                className="form-control py-3 my-3"
                                placeholder="Recipe Description"
                            ></textarea>
                        </div>
                        {errors.description && (
                            <span className="text-danger mt-2">{errors.description.message}</span>
                        )}

                        <div className="input-group mt-3">
                            <input
                                {...register("recipeImage")}
                                className="form-control py-3 my-3"
                                placeholder="Recipe Image"
                                type='file'
                            />
                        </div>
                        {errors.recipeImage && (
                            <span className="text-danger mt-2">{errors.recipeImage.message}</span>
                        )}

                        <button type="submit" disabled={isSubmitted} className="btn w-100 btn-success mt-3">{isSubmitted ? "saving ..." : 'Save'}</button>
                    </form>

                </main>
            </div>
        </>
    )
}



