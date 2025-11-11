const AlertPopup = () => {
  return (
    <div className="space-y-3">
      <p className="text-gray-700">
        Are you sure you want to alert all employees? An email will be sent to their official work addresses.      
      </p>
      <button className="bg-red-600 text-white px-4 py-2 rounded-lg w-full">
        Yes, Alert all
      </button>
    </div>
  );
};

export default AlertPopup;
