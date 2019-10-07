import React, { Component } from "react";
import CardNextWorkorder from "../../components/cards/CardNextWorkorder";
export default class WorkordersList extends Component {
  render() {
    const {
      workorders,
      handleClickOpen,
      handleAccept,
      handleClickOpenNext
    } = this.props;
    return (
      <React.Fragment>
        {workorders.map((item, key) => (
          <CardNextWorkorder
            key={key}
            workorder={item}
            handleClickOpenNext={workcenterProductivity =>
              handleClickOpenNext(item, workcenterProductivity)
            }
            handleAccept={handleAccept}
            handleEdit={() => handleClickOpen(item)}
          />
        ))}
      </React.Fragment>
    );
  }
}
