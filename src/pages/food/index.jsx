import { useLocation, useSearchParams } from "react-router-dom";
import ViewDetail from "./ViewDetail";
import { useEffect, useState } from "react";
import { fetchFoodById } from "../../services/api";
import { getFoodById } from "../../services/foodService";

const FoodPage = () => {
  let location = useLocation();
  console.log(">>>check location: ", location);
  const [dataFood, setDataFood] = useState();
  let params = new URLSearchParams(location.search);
  console.log(">>>check params: ", params);
  const id = params?.get("id"); //* food id
  console.log(">>>> check id: ", id);
  const data = {
    ID: id,
  };
  console.log(">>>> check food id: ", id);
  useEffect(() => {
    fetchFood(data);
  }, [id]);
  const fetchFood = async () => {
    console.log(">>>> check id: ", id);
    const res = await getFoodById(id);
    console.log(">>> check datafood: ", res);
    if (res && res.EC === 0) {
      setDataFood(res.DT);
    }
  };
  return (
    <>
      <ViewDetail dataFood={dataFood} />
    </>
  );
};

export default FoodPage;
