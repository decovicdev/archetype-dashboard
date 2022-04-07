import { ChangeEventHandler } from 'react';
import { RadioOption } from 'types/Form';

type Props = {
  options: RadioOption[];
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: string;
};

const RadioGroup: React.FC<Props> = ({ options, onChange, checked }) => (
  <div className="flex justify-center">
    {options?.map((option) => (
      <div className="form-check" key={option.id}>
        <input
          className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
          type="radio"
          name={option.id}
          id={option.id}
          value={option.value}
          checked={checked === option.value}
          onChange={onChange}
        />
        <label
          className="form-check-label inline-block text-gray-800"
          htmlFor={option.id}
        >
          {option.label}
        </label>
      </div>
    ))}
  </div>
);

export default RadioGroup;
