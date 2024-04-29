import Card from "./shared/Card";
import Dropdown from "react-bootstrap/Dropdown";
import { RxDotsHorizontal } from "react-icons/rx";
import { AiTwotoneDelete } from "react-icons/ai";
import { RiEdit2Line } from "react-icons/ri";

function MoviesItem({ item, id, onDelete, onEdit }) {
  return (
    <Card>
      <div className="d-flex justify-content-between">
        <div className="name">{item.text}</div>
        <div className="date">{item.date}</div>
        <div className="rate">{item.rating}</div>
        <Dropdown>
          <Dropdown.Toggle
            id="dropdown-basic"
            variant="success"
            className="dropdown"
          >
            <RxDotsHorizontal />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item
              href="#/action-1"
              onClick={() => onDelete(item.id, item.text)}
            >
              <AiTwotoneDelete
                style={{ color: "#b80000", fontSize: "1.2rem" }}
              />
            </Dropdown.Item>
            <Dropdown.Item href="#/action-1" onClick={() => onEdit(item)}>
              <RiEdit2Line style={{ color: "#ffdd95", fontSize: "1.2rem" }} />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="comment">Your Thought:{item.comment}</div>
    </Card>
  );
}

export default MoviesItem;
