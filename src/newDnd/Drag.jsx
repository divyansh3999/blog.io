import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from "axios";
import { ReactComponent as Edit } from "../newDnd/edit.svg";
import $ from "jquery";
import jQuery from "jquery";
import "../newDnd/style.css";

function DragTable() {
  $(document).ready(function() {
    (function($) {
      $("#filter").keyup(function() {
        var rex = new RegExp($(this).val(), "i");

        $(".searchable tr").hide();

        $(".searchable tr")
          .filter(function() {
            return rex.test($(this).text());
          })

          .show();

        $(".no-data").hide();

        if ($(".searchable tr:visible").length == 0) {
          $(".no-data").show();
        }
      });
    })(jQuery);
  });

  const [data, setData] = useState([]);
  var ref = useRef();
  useEffect(() => {
    test();
  }, []);
  const test = async () => {
    const yourConfig = {
      headers: {
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFETUlOLTAwMDAwMDAwMSIsImZhY2Vib29rSWQiOm51bGwsImVtYWlsIjoibWV5dXNpbmdhcG9yZUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6NCwiaXNHdWVzdCI6ZmFsc2UsImhhc1Byb2ZpbGUiOnRydWUsInVuaXF1ZUtleSI6ZmFsc2UsImlhdCI6MTY1MDI1NjU5NiwiZXhwIjozMjI4MTM2NTk2fQ.5rtWKyZJjSxvGwIm6GsXvN6RMpHa-rZBAy2UoFBP-j4",
      },
    };
    await axios
      .get("http://13.213.151.153:8082/api/common/category", {
        headers: yourConfig.headers,
      })
      .then((response) => {
        setData(response.data.data);
        console.log(response);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const handleDragEnd = (results) => {
    if (!results.destination) return;
    console.log(results.destination.index);
    console.log(results.draggableId);
    // POST API CALL HERE FOR CHANGING DATA

    const yourConfig = {
      headers: {
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFETUlOLTAwMDAwMDAwMSIsImZhY2Vib29rSWQiOm51bGwsImVtYWlsIjoibWV5dXNpbmdhcG9yZUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6NCwiaXNHdWVzdCI6ZmFsc2UsImhhc1Byb2ZpbGUiOnRydWUsInVuaXF1ZUtleSI6ZmFsc2UsImlhdCI6MTY1MDI1NjU5NiwiZXhwIjozMjI4MTM2NTk2fQ.5rtWKyZJjSxvGwIm6GsXvN6RMpHa-rZBAy2UoFBP-j4",
      },
    };
    const param = {
      priorityIndex: results.destination.index,
      id: results.draggableId,
    };
    axios
      .post(
        "http://13.213.151.153:8082/api/admin/set-category-priority",
        param,
        {
          headers: yourConfig.headers,
        }
      )
      .then((response) => {
        console.log("API Response: ", response.data.data);
        test();
      })

      .catch((error) => {
        console.log(error);
      });
    // let [selectedItem] = data.splice(results.source.index, 1);
    // console.log(selectedItem)
    // tempuser.splice(results.source.index, 1 , selectedItem);
    // console.log(selectedItem)
  };
  // console.log(newData);
  return (
    <div className="container">
      <div className="col-sm-3">
        <input
          type="search"
          className="form-control"
          placeholder="Search..."
          id="filter"
          aria-label="Search"
        />
      </div>
      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Serial No.</th>
              <th scope="col">Image</th>
              <th scope="col">Cuisine Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <Droppable droppableId="tbody">
            {(provided) => (
              <tbody
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="searchable"
              >
                <tr className="no-data">
                  <td colspan="4">No Data Is Available</td>{" "}
                </tr>

                {data.map((item, index) => (
                  <Draggable
                    draggableId={item.id}
                    index={index}
                    key={item.name}
                  >
                    {(provided) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        key={index}
                        className="cateItem"
                      >
                        <th scope="row">{index + 1}</th>
                        <td>
                          <img
                            alt="categoryImages"
                            src={`http://13.213.151.153:8082/${item.MediaObjects.map(
                              (element) => element.imageUrl
                            )}`}
                            width={100}
                          />
                        </td>
                        <td>
                          <p>{item.name}</p>
                        </td>
                        <td>
                          <span className="edit">
                            <Edit width={18} />
                          </span>
                        </td>
                      </tr>
                    )}
                  </Draggable>
                ))}
              </tbody>
            )}
          </Droppable>
        </table>
        <p id="message" className="text-center"></p>
      </DragDropContext>
    </div>
  );
}

export default DragTable;
