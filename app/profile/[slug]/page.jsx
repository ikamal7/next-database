"use client";
import { useState } from "react";

export default function Page({ params }) {
    const [isDescriptionHidden, setIsDescriptionHidden] = useState(true);

  const toggleDescription = () => {
    setIsDescriptionHidden(!isDescriptionHidden);
  };

  const arrowIcon = isDescriptionHidden ? (
    <path d="M5 0L9.33013 4.33013L8.66625 5L5 1.33375L1.33375 5L0.669872 4.33013L5 0Z" fill="#DCB322" />
  ) : (
    <path d="M5 10L0.669872 5.66987L1.33375 5L5 8.66625L8.66625 5L9.33013 5.66987L5 10Z" fill="#DCB322" />
  );
    return (
        <>

            <div class="single-profile">
                <div class="container">
                    <div class="profile">
                        <div class="left-info">
                            <h5>STUFF PROFILE</h5>
                            <h1>Siddiqur Rahman Biplob</h1>
                            <div class="info">
                                <h4>MAIN AGENCY</h4>
                                <p>ABC STUDIO</p>
                            </div>
                            <div class="info">
                                <h4>IDENTITY</h4>
                                <p>DESIGNER</p>
                            </div>
                        </div>
                        <div class="right-info">
                            <div class="pro-pic">
                                <svg width="448" height="476" viewBox="0 0 448 476" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="448" height="476" fill="#D9D9D9" />
                                </svg>
                            </div>
                            <div class="details-flex">
                                <div class="info">
                                    <h4>IDENTITY</h4>
                                    <p>DESIGNER</p>
                                </div>
                                <div class="info">
                                    <h4>IDENTITY</h4>
                                    <p>DESIGNER</p>
                                </div>
                                <div class="info">
                                    <h4>IDENTITY</h4>
                                    <p>DESIGNER</p>
                                </div>
                                <div class="info">
                                    <h4>IDENTITY</h4>
                                    <p>DESIGNER</p>
                                </div>
                            </div>
                            <div class="clients">
                                <h3>CLIENTS</h3>
                                <div class="single-client">
                                    <div class="left">
                                        <div class="assist">
                                            <h6>ASSISTED</h6>
                                            <p>Jahangir HHHH Hossain</p>
                                        </div>
                                    </div>
                                    <div class="right">
                                        <div class="assist-info">
                                            <div class="item-flex">
                                                <div>
                                                    <span class="date">24 APril 2023</span>
                                                    <span class="location">COXS BAZARRRRR</span>
                                                    <span class="type">connotation</span>
                                                </div>
                                                <a href="#" class="source">Source: BDNews 24</a>
                                            </div>
                                            <div>
                                                <div class="title-flex">
                                                    <h5>DESCRIPTION</h5>
                                                    <span class="toggle-arrow" onClick={toggleDescription}>
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 0L9.33013 4.33013L8.66625 5L5 1.33375L1.33375 5L0.669872 4.33013L5 0Z" fill="#DCB322" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className={isDescriptionHidden ? 'hidden' : ''} id="descriptionText">It is a long established fact that a
                                                    reader will be distracted by the readable content of a page when looking at
                                                    its layout. The point of using Lorem Ipsum is that it has a more-or-less
                                                    normal distribution of letters, as opposed to using 'Content here, content
                                                    here', making it look like readable English. Many desktop publishing
                                                    packages and web page editors now use Lorem Ipsum as their default model
                                                    text, and a search for 'lorem ipsum' will uncover many web sites still in
                                                    their infancy. Various versions have evolved over the years, sometimes by
                                                    accident, sometimes on purpose (injected humour and the like). Various
                                                    versions have evolved over the years, sometimes by accident, sometimes on
                                                    purpose (injected humour and the like). The point of using Lorem Ipsum is
                                                    that it has a more-or-less normal.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    )
}