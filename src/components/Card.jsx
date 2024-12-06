import React from "react";
import DelButton from "./DelButton";
import { MdLocationOn, MdOutlineDateRange } from "react-icons/md";

import { GiSuitcase } from "react-icons/gi";

const Card = ({ job }) => {
  //durumlara göre renk tanımladığımız nesne
  const colors = {
    Mülakat: "green",
    Reddedildi: "red",
    "Devam Ediyor": "rgb(0, 149, 218)",
  };

  return (
    <div className="card">
      <div className="head">
        <section>
          <div className="letter">
            <span>{job.company[0]}</span>
          </div>

          <div className="info">
            <p>{job.position}</p>
            <p>{job.company}</p>
          </div>
        </section>
        <section>
          <DelButton id={job.id} />
        </section>
      </div>
      <div className="body">
        <div className="field">
          <MdLocationOn />
          <p>{job.location}</p>
        </div>

        <div className="field">
          <GiSuitcase />
          <p>{job.type}</p>
        </div>

        <div className="field">
          <MdOutlineDateRange />
          <p>{new Date(job.date).toLocaleDateString()}</p>
        </div>

        <div className="status">
          <p style={{ background: colors[job.status] }}>{job.status}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
