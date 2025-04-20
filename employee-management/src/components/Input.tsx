interface InputProps {
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
  }
  
  const Input = ({ label, type, value, onChange, name }: InputProps) => (
    <div className="mb-4">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        className="mt-1 p-2 w-full border border-gray-300 rounded"
      />
    </div>
  );
  
  export default Input;
  