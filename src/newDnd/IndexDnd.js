import React, { useState, useCallback, useRef, useEffect } from "react";
import { Row, Table } from "antd";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import { hover } from "@testing-library/user-event/dist/hover";
import axios from "axios";
import { ReactComponent as Edit } from "../newDnd/edit.svg";
import "../newDnd/style.css";

const type = "DragbleBodyRow";
const DragbleBodyRow = ({ index, moveRow, className, style, ...restProps }) => {
  const ref = useRef();
  const [{ isOver, dropClassName }, drop] = useDrop(
    () => ({
      accept: type,
      collect: (monitor) => {
        const { index: dragIndex } = monitor.getItem() || {};
        if (dragIndex === index) {
          return {};
        }
        return {
          isOver: monitor.isOver(),
          dropClassName:
            dragIndex < index ? "drop-over-downward" : "drop-over-upward",
        };
      },
      drop: (item) => {
        moveRow(item.index, index);
      },
    }),
    [index]
  );
  const [, drag] = useDrag(
    () => ({
      type,
      item: { index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [index]
  );
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    ></tr>
  );
};

const columns = [
  {
    title: "Serial No",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img alt={image} src={`http://13.213.151.153:8081/${image}`} />
    ),
  },
  {
    title: "Cuisine",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
    render: () => (
      //   <button className="btn btn-primary">
      <span className="edit">
        <Edit width={18} />
      </span>
      //   </button>
    ),
  },
];
const IndexDnd = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    test();
  }, []);
  const test = async () => {
    const yourConfig = {
      headers: {
        Authorization:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFETUlOLTAwMDAwMDAwMiIsImZhY2Vib29rSWQiOm51bGwsImVtYWlsIjoibWV5dXNpbmdhcG9yZUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6NCwiaXNHdWVzdCI6ZmFsc2UsImhhc1Byb2ZpbGUiOnRydWUsInVuaXF1ZUtleSI6ZmFsc2UsImlhdCI6MTY0OTkzNjkxNiwiZXhwIjozMjI3ODE2OTE2fQ.FGU0dfj7RIafQOM1fAG2g9XqQeJy3ui6vLiDbM7WtX4",
      },
    };
    await axios
      .get("http://13.213.151.153:8081/api/common/category", yourConfig)
      .then((response) => {
        setData(
          response.data.data.map((row, index) => ({
            id: index + 1,
            name: row.name,
            image: row.MediaObjects.map((item) => item.imageUrl),
          }))
        );
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   const [data, setData] = useState([
  //     {
  //       key: "1",
  //       name: "aman",
  //       age: 26,
  //       address: "index",
  //     },
  //     {
  //       key: "2",
  //       name: "bisht",
  //       age: 25,
  //       address: "index",
  //     },
  //     {
  //       key: "3",
  //       name: "div",
  //       age: 27,
  //       address: "index",
  //     },
  //   ]);

  const components = {
    body: {
      row: DragbleBodyRow,
    },
  };

  const moveRow = useCallback(
    (dragIndex, hoverIndex) => {
      const dragRow = data[dragIndex];
      setData(
        update(data, {
          $splice: [
            [dragIndex, 2],
            [hoverIndex, 0, dragRow],
          ],
        })
      );
    },
    [data]
  );
  return (
    <div className="container mt-5">
      <div className="cateTable">
        <DndProvider backend={HTML5Backend}>
          <div className="row reactHeaderBox">
            <div className="col-sm-9">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  5
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      10
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      15
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                aria-label="Search"
              />
            </div>
          </div>
          <Table
          className="table-striped-rows"
            columns={columns}
            dataSource={data}
            components={components}
            // pagination={{
            //   total: data.length,
            //   pageSize: 5,
            // }}
            onRow={(record, index) => ({
              index,
              moveRow,
            })}
          />
        </DndProvider>
      </div>
    </div>
  );
};

export default IndexDnd;
