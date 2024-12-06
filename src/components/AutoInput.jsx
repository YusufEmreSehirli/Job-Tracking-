import { useSelector } from "react-redux";

const AutoInput = ({ label, name }) => {
  const { jobs } = useSelector((store) => store.job);

  //sadece istediğimiz değerlerinden oluşan dizi tanımlama
  const arr = jobs.map((job) => job[name]);
  //dizideki tekrar eden elemanları kaldır
  const set = new Set(arr);
  //set'in döndürdüğü nesneyi diziye çevir
  const options = Array.from(set);
  console.log(options);

  return (
    <div>
      <label htmlFor={label}>{label}</label>

      <input list={name} name={name} id={label} type="text" required />
      <datalist id={name}>
        {options.map((item) => (
          <option value={item} />
        ))}
      </datalist>
    </div>
  );
};

export default AutoInput;
