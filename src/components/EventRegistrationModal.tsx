import { useState } from "react";
import { db } from "../firebase";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

type EventRegistrationModalProps = {
  groupId: string; // Pass the group ID as a prop
  closeModal: () => void;
};

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  groupId,
  closeModal,
}) => {
  const [eventName, setEventName] = useState("");
  const [eventHostName, setEventHostName] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [eventStartDate, setEventStartData] = useState<Date>();
  const [eventEndDate, setEventEndDate] = useState<Date>();
  const [eventLocation, setEventLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [eventCreationSuccess, setEventCreationSuccess] = useState(false);

  const registerEvent = async () => {
    try {
      const eventId = uuidv4(); // Generate a unique ID using UUID
      const eventCreateRef = doc(db, "Groups", groupId, "Events", eventId);

      if (
        !eventName ||
        !eventHostName ||
        !eventDetails ||
        !eventStartDate ||
        !eventEndDate ||
        !eventLocation
      ) {
        setErrorMessage("Please fill in all fields");
        return;
      }

      const eventData = {
        eventName,
        eventHostName,
        eventDetails,
        eventStartDate: Timestamp.fromDate(new Date(eventStartDate)),
        eventEndDate: Timestamp.fromDate(new Date(eventEndDate)),
        eventLocation,
      };
      await setDoc(eventCreateRef, eventData);
      setEventCreationSuccess(true);

      console.log("Event created successfully");
      closeModal();
    } catch (error) {
      console.error("Error registering event:", error);
    }
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div
          className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Event Registration
                </h3>
                <div className="mt-2">
                  {/* Event name  */}
                  <div className="mb-4">
                    <label
                      htmlFor="event-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Name
                    </label>
                    <input
                      type="text"
                      name="event-name"
                      id="event-name"
                      className="mt-1 p-2 block bg-gray-200 w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={eventName}
                      onChange={(e) => setEventName(e.target.value)}
                    />
                  </div>
                  {/* Event Host Name */}
                  <div className="mb-4">
                    <label
                      htmlFor="event-host-name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Host Name
                    </label>
                    <input
                      type="text"
                      name="event-host-name"
                      id="event-host-name"
                      className="mt-1 p-2 bg-gray-200 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={eventHostName}
                      onChange={(e) => setEventHostName(e.target.value)}
                    />
                  </div>

                  {/* Event Details */}
                  <div className="mb-4">
                    <label
                      htmlFor="event-details"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Details (keep it short)
                    </label>
                    <textarea
                      name="event-details"
                      id="event-details"
                      className="mt-1 p-2 bg-gray-200 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={eventDetails}
                      onChange={(e) => setEventDetails(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-row justify-between">
                    {/* Event Date */}
                    <div className="mb-4">
                      <label
                        htmlFor="event-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Event Date
                      </label>
                      <input
                        type="date"
                        name="event-date"
                        id="event-date"
                        className="mt-1 p-2 bg-gray-200 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={eventStartDate?.toISOString().slice(0, 10) || ""}
                        onChange={(e) =>
                          setEventStartData(new Date(e.target.value))
                        }
                      />
                    </div>

                    {/* Event End date */}
                    <div className="mb-4 ml-2">
                      <label
                        htmlFor="event-end-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Event End Date
                      </label>
                      <input
                        type="date"
                        name="event-end-date"
                        id="event-end-date"
                        className="mt-1 p-2 bg-gray-200 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={eventEndDate?.toISOString().slice(0, 10) || ""}
                        onChange={(e) =>
                          setEventEndDate(new Date(e.target.value))
                        }
                      />
                    </div>
                  </div>

                  {/* Event Location */}
                  <div className="mb-4">
                    <label
                      htmlFor="event-location"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Event Location
                    </label>
                    <input
                      type="text"
                      name="event-location"
                      id="event-location"
                      className="mt-1 p-2 bg-gray-200 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {errorMessage && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-4">
              {errorMessage}
            </div>
          )}
          {eventCreationSuccess && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-4">
              Login successful! Redirecting you to the homepage...
            </div>
          )}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={registerEvent}
            >
              Register
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventRegistrationModal;
