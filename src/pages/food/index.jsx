import { useLocation, useSearchParams } from "react-router-dom";
import ViewDetail from "./ViewDetail";
import { useEffect, useState } from "react";
import { getFoodById } from "../../services/foodService";
import Header from "../../components/Header/Header";

const FoodPage = () => {
  let location = useLocation();
  const [dataFood, setDataFood] = useState();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id"); //* food id
  const data = {
    ID: id,
  };
  useEffect(() => {
    fetchFood(data);
  }, [id]);
  const fetchFood = async () => {
    const res = await getFoodById(id);
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
