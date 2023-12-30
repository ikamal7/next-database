"use client";
import { useState, useEffect } from "react";
import Airtable from "airtable";
import Link from "next/link";

export default function Page({ params }) {
    const [profile, setProfile] = useState(null);
    const [isDescriptionHidden, setIsDescriptionHidden] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
            const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    
            Airtable.configure({
              apiKey: apiKey
            });
    
            const base = Airtable.base(baseId);
            const tableName = 'Imported table';
    
            // Fetch the record using its ID
            const record = await base(tableName).find(params.slug);
    
            // Set the fetched record in state
            setProfile(record.fields);
          } catch (error) {
            console.error('Error fetching data from Airtable:', error);
          }
        };
    
        fetchData();
      }, [params.slug]); // Include params.slug as a dependency

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
            {profile && (
            <div className="single-profile">
                <div className="container">
                        <Link href={'/'}>Back to Home</Link>
                    <div className="profile">
                        <div className="left-info">
                            <h5>STUFF PROFILE</h5>
                            <h1>{profile.name}</h1>
                            <div className="info">
                                <h4>MAIN AGENCY</h4>
                                <p>{profile.main_agency}</p>
                            </div>
                            <div className="info">
                                <h4>IDENTITY</h4>
                                <p>{profile.identity}</p>
                            </div>
                        </div>
                        <div className="right-info">
                            <div className="pro-pic">
                                <svg width="448" height="476" viewBox="0 0 448 476" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect width="448" height="476" fill="#D9D9D9" />
                                </svg>
                            </div>
                            <div className="details-flex">
                                <div className="info">
                                    <h4>POSITION</h4>
                                    <p>{profile.position}</p>
                                </div>
                                <div className="info">
                                    <h4>Execution TYPE</h4>
                                    <p>{profile.execution_type}</p>
                                </div>
                                <div className="info">
                                    <h4>ACTIVE YEARS</h4>
                                    <p>{profile.active_year}</p>
                                </div>
                                <div className="info">
                                    <h4>Executing Agency</h4>
                                    <p>{profile.executing_unit}</p>
                                </div>
                                <div className="info">
                                    <h4>LocationS</h4>
                                    <p>{profile.location}</p>
                                </div>
                            </div>
                            <div className="clients">
                                <h3>CLIENTS</h3>
                                <div className="single-client">
                                    <div className="left">
                                        <div className="assist">
                                            <h6>ASSISTED</h6>
                                            <p>{profile.client}</p>
                                        </div>
                                    </div>
                                    <div className="right">
                                        <div className="assist-info">
                                            <div className="item-flex">
                                                <div>
                                                    <span className="date">{profile.date}</span>
                                                    <span className="location">{profile.location}</span>
                                                    <span className="type">connotation</span>
                                                </div>
                                                <a href="#" className="source">Source: {profile.source}</a>
                                            </div>
                                            <div>
                                                <div className="title-flex">
                                                    <h5>DESCRIPTION</h5>
                                                    <span className="toggle-arrow" onClick={toggleDescription}>
                                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M5 0L9.33013 4.33013L8.66625 5L5 1.33375L1.33375 5L0.669872 4.33013L5 0Z" fill="#DCB322" />
                                                        </svg>
                                                    </span>
                                                </div>
                                                <p className={isDescriptionHidden ? 'hidden' : ''} id="descriptionText">{profile.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}