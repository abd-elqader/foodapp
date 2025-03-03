

export default function Header({title, description, image}) {
    return (
        <>
                <div className="container-fluid bg-success rounded-2 text-white">
                    <div className="row justify-content-between custom-min-height align-items-center">
                        <div className="col-9">
                            <div className="caption">
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="header-image">
                                <img src={image} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}