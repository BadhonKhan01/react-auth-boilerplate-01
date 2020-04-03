import React from 'react';

// ===================================
//  Load Custom Style & Bootstrap
// ===================================
import './scss/style.scss';
import './../../../resources/scss/style.scss';

// ===================================
//  Load Image
// ===================================
import Logo from './../../../resources/img/fingerprint.gif';

const Page = () => {
    return (
        <section className="main-section d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-lg-6 text-center pb-4">
                        <img src={Logo} className="img-fluid" alt="Logo"/>
                    </div>
                    <div className="col-md-12 col-lg-6 d-flex align-items-center text-center text-lg-left">
                        <figure>
                            <h1>React Auth Boilerplate</h1>
                            <p className="text-muted">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.</p>
                        </figure>
                    </div>  
                </div>
            </div>
        </section>
    );
};

export default Page;