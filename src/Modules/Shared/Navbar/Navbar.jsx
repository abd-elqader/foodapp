export default function Navbar({ loginData }) {
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary rounded-2 mb-3">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"> {loginData?.userEmail}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}