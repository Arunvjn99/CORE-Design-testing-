import styles from "./SponsorCard.module.scss";
import React from "react";
import { Link } from "react-router";
import AddToolTip from "../AddToolTip";
import { get } from "lodash-es";
const SponsorCard = (props) => {
  return (
    <div className="Sponsor-Card">
      {props.type == "img" ? (
        <div className={`${styles["p-1p87501p8751p25r"]}`}>
          <img src={props.image} className={`${styles["w-6p438r-h-2r"]}`} />
        </div>
      ) : null}
      {props.title && <p className={styles.sponsorTitle}>{props.title}</p>}
      {props.type == "link" ? (
        <p className={styles.sponsorValue}>
          <Link className="link-style" onClick={props.onClick}>
            {props.value}
          </Link>
        </p>
      ) : get(props, "value", "")?.toString()?.length > 20 ? (
        <AddToolTip name={props.value} className={styles.sponsorValue}>
          {props.value}
        </AddToolTip>
      ) : (
        <p className={styles.sponsorValue}>{props.value}</p>
      )}
    </div>
  );
};

export default SponsorCard;
