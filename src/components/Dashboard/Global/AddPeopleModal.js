import { useState, useEffect } from 'react';
import { Icons } from '@utils/constantData/icons';
import Button from '@components/Common/Button';
import { useNotifications } from '@components/Common/Notification';

const AddMembersModal = ({ isOpen, onClose, onSubmit }) => {
  const message = useNotifications();
  const [members, setMembers] = useState([{ name: '', email: '' }]);
  const [isAdding, setIsAdding] = useState(false);
  const [errors, setErrors] = useState([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setMembers([{ name: '', email: '' }]);
      setErrors([]);
    }
  }, [isOpen]);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleClose = () => {
    onClose();
    setMembers([{ name: '', email: '' }]);
    setErrors([]);
  };

  // Update member input values
  const handleChange = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);

    // Clear error for this field if it exists
    if (errors.find((e) => e.index === index && e.field === field)) {
      setErrors(
        errors.filter((e) => !(e.index === index && e.field === field)),
      );
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = [];

    members.forEach((member, index) => {
      if (!member.name.trim()) {
        newErrors.push({ index, field: 'name', message: 'Name is required' });
      }

      if (!member.email.trim()) {
        newErrors.push({ index, field: 'email', message: 'Email is required' });
      } else if (!validateEmail(member.email)) {
        newErrors.push({
          index,
          field: 'email',
          message: 'Invalid email format',
        });
      }
    });

    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (members.every((member) => !member.name && !member.email)) {
      setErrors([
        {
          index: 0,
          field: 'name',
          message: 'At least one member must be added',
        },
      ]);
      return;
    }

    setIsAdding(true);

    try {
      await onSubmit(members.filter((member) => member.name || member.email));
      handleClose();
    } catch (err) {
      message.error('Error adding member', err.message);
    } finally {
      setIsAdding(false);
    }
  };

  // Check if field has error
  const getError = (index, field) => {
    return errors.find((e) => e.index === index && e.field === field)?.message;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm transition-opacity">
      <div className="bg-white flex flex-col lg:max-h-2xl h-fit overflow-y-scroll scrollbar-hide  lg:w-2/5 w-11/12 p-0 rounded-3xl shadow-xl transform transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="bg-indigo-50 rounded-t-2xl p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Icons.FaLinkedin className="text-indigo-800" size={20} />
              <h2 className="text-md lg:text-xl mb-0 p-0 font-bold text-indigo-800">
                Add LinkedIn Profile
              </h2>
            </div>
            <button
              className="text-gray-500 hover:text-gray-800 hover:bg-indigo-100 p-2 rounded-full transition-colors"
              onClick={handleClose}
            >
              <Icons.Cross size={20} />
            </button>
          </div>
          <p className="m-0 pt-2 text-gray-600 "></p>
          <strong>Email must be associated with a LinkedIn account.</strong>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="">
          <div className="space-y-3 overflow-y-scroll mx-auto scrollbar-hide">
            {members.map((member, index) => (
              <div
                key={index}
                className=" p-4 rounded-xl hover:border-indigo-100 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor={`name-${index}`}
                      className="block text-xs font-medium text-gray-500 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icons.User className="text-gray-700" />
                      </div>
                      <input
                        type="text"
                        id={`name-${index}`}
                        value={member.name}
                        onChange={(e) =>
                          handleChange(index, 'name', e.target.value)
                        }
                        required
                        placeholder="John Doe"
                        className={`pl-10 pr-3 py-2 block w-full border border-gray-300  rounded-full`}
                      />
                    </div>
                    {getError(index, 'name') && (
                      <p className="mt-1 text-sm text-red-600">
                        {getError(index, 'name')}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor={`email-${index}`}
                      className="block text-xs font-medium text-gray-500 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icons.Mail className="text-gray-700" />
                      </div>
                      <input
                        type="email"
                        id={`email-${index}`}
                        value={member.email}
                        required
                        onChange={(e) =>
                          handleChange(index, 'email', e.target.value)
                        }
                        placeholder="john@example.com"
                        className={`pl-10 pr-3 py-2 block w-full border border-gray-300 rounded-full`}
                      />
                    </div>
                    {getError(index, 'email') && (
                      <p className="mt-1 text-sm text-red-600">
                        {getError(index, 'email')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mb-3 mr-3">
            <Button
              onClick={handleSubmit}
              buttonText="Add Profile"
              className="bg-sky-900 !rounded-full px-6 "
              loadingText="Adding..."
              isLoading={isAdding}
              disabled={isAdding}
              theme="dark"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMembersModal;
