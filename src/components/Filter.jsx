import React, { useEffect, useState } from "react";
import Select from "./Select";
import Button from "./Button";
import { sortOpt, statusOpt, typeOpt } from "./../utils/constants";
import api from "../utils/api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setLoading } from "../redux/slices/jobSlice";

const Filter = () => {
  const [text, setText] = useState();
  const [debouncedText, setDebouncedText] = useState();
  const [sort, setSort] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();

  const dispatch = useDispatch();

  //* DEBOUNCE
  //?  her tuş vuruşunda filtreleme yapmak hem client'in cihazında hemde sunucuyu gereksiz yorar. bu yüzden kullanıcın bir butona basmasını gerektirmneyen inputlarda debounce yöntemi kullanılarak her tuş vuruşunda değil kullanıcı yazma işlemini sonlandırdığında ilgili fonksiyonu çağırırız.ardışık olarak gerçekleşen fonksiyon çağırma işlemlerinde fonksiyonun çağırıldığını görmezden gelir ancak belirli bir zaman aşımı olduğunda fonksiyonu çalıştırır.

  useEffect(() => {
    if (text === undefined) return;

    //bir sayaç başlat ve sayaç durunca işlem yap
    const timer = setTimeout(() => setDebouncedText(text), 500);
    //eğer ki süre bitmeden tekrar useEffect çalışırsa o zaman önceki sayacı iptal et
    return () => clearTimeout(timer);
  }, [text]);

  //filtreleme ve sıralama için bir state değiştiğinde api'dan güncel verileri al
  useEffect(() => {
    const sortP =
      sort === "a-z" || sort === "z-a"
        ? "company"
        : sort === "En Yeni" || sort === "En Eski"
        ? "date "
        : undefined;

    const orderP =
      sort === "a-z" || sort === "En Eski"
        ? "asc"
        : sort === "z-a" || sort === "En Yeni"
        ? "desc"
        : undefined;

    const params = {
      q: debouncedText,
      status: status || undefined,
      type: type || undefined,
      _sort: sortP,
      _order: orderP,
    };
    dispatch(setLoading());

    api
      .get("/jobs", { params })
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err.message)));
  }, [debouncedText, status, sort, type]);

  // bvütün stateleri sıfırla
  const handleReset = () => {
    setDebouncedText();
    setText();
    setType();
    setStatus();
    setSort();
  };

  console.log(text);

  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form onReset={handleReset}>
        <div>
          <label>Ara</label>
          <input onChange={(e) => setText(e.target.value)} type="text" />
        </div>

        <Select
          label="Durum"
          options={statusOpt}
          fn={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Tür"
          options={typeOpt}
          fn={(e) => setType(e.target.value)}
        />
        <Select
          label="Sırala"
          options={sortOpt}
          fn={(e) => setSort(e.target.value)}
        />

        <Button type="reset" text="Filtreleri Sıfırla" />
      </form>
    </div>
  );
};

export default Filter;
