import { useState, useEffect } from "react";

function RatingSelect({ select, movieEdit }) {
  const [selected, setSelected] = useState(2);
  useEffect(() => {
    if (movieEdit.edit === true) {
      setSelected(movieEdit.item.data.rating);
    }
  }, [movieEdit]);

  const handleChange = (e) => {
    setSelected(+e.currentTarget.value);
    select(+e.currentTarget.value);
  };
  return (
    <ul className="rating">
      <li>
        <input
          type="radio"
          value="1"
          name="rating"
          id="num1"
          onChange={handleChange}
          checked={selected === 1}
        ></input>
        <label htmlFor="num1">1</label>
      </li>
      <li>
        <input
          type="radio"
          value="2"
          name="rating"
          id="num2"
          onChange={handleChange}
          checked={selected === 2}
        ></input>
        <label htmlFor="num2">2</label>
      </li>

      <li>
        <input
          type="radio"
          value="3"
          name="rating"
          id="num3"
          onChange={handleChange}
          checked={selected === 3}
        ></input>
        <label htmlFor="num3">3</label>
      </li>
      <li>
        <input
          type="radio"
          value="4"
          name="rating"
          id="num4"
          onChange={handleChange}
          checked={selected === 4}
        ></input>
        <label htmlFor="num4">4</label>
      </li>
      <li>
        <input
          type="radio"
          value="5"
          name="rating"
          id="num5"
          onChange={handleChange}
          checked={selected === 5}
        ></input>
        <label htmlFor="num5">5</label>
      </li>
    </ul>
  );
}

export default RatingSelect;
