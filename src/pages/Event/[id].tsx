import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  DocumentData,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "@firebase/firestore";
import { auth, db } from "@/firebase";
import Navbar from "@/components/Navbar";

const EventDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<DocumentData | null | Event>(null);
  const [user, setUser] = useState<string | null>("guest");
  const [rsvpSuccess, setRsvpSuccess] = useState(false);
  const [rsvpError, setRsvpError] = useState(false);

  type Event = {
    id: string;
    eventName: string;
    eventDetails: string;
    eventLocation: string;
    eventHostName: string;
    eventImage: string;
    eventStartDate: EventDate;
    eventEndDate: EventDate;
    attendees: string[];
  };

  type EventDate = {
    seconds: number;
  };

  const validateRSVP = () => {
    if (event?.attendees.includes(user as string)) {
      return true;
    } else {
      return false;
    }
  };

  const fetchEventDetails = async () => {
    try {
      // Reference the Firestore collection and document
      const collectionRef = collection(db, "Events");
      const documentRef = doc(collectionRef, id as string);

      // Fetch the document
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        console.log("docSnap:", docSnap.data());
        setEvent(docSnap.data() as DocumentData);
      } else {
        console.log("No matching document");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  console.log("Event", event);

  const handleDate = (seconds: number) => {
    const date = new Date(seconds * 1000);
    return date.toLocaleDateString();
  };

  const registerAttendee = async () => {
    if (localStorage.getItem("user") !== null) {
      console.log("User is logged in");
      console.log("User:", localStorage.getItem("user"));
      console.log("email", auth.currentUser?.email);
    } else {
      console.log("User is not logged in");
      router.push("/Login");
    }

    try {
      const eventRef = doc(db, "Events", id as string);
      await updateDoc(eventRef, {
        attendees: [...event?.attendees, user],
      });
      setRsvpSuccess(true);
    } catch (error) {
      console.log("Error:", error);
      setRsvpError(true);
    }
    console.log("attender", user);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // localStorage.removeItem("user");
  }, []);

  console.log("user", user);
  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <header className="px-20 w-full border-b border-shadowColor bg-gray-500 py-2 lg:py-6">
        <div className="md:max-w-screen mx-auto">
          <h1>
            <span className="overflow-ellipsis overflow-hidden text-3xl text-white font-bold leading-snug">
              {event?.eventName}
            </span>
            {/* <span className="text-4xl font-bold text-white">Group Name</span> */}
          </h1>
          <div className="flex flex-row mt-4 lg:mt-5">
            <div>
              <picture>
                <img
                  className="rounded-full object-cover"
                  src={event?.eventImage}
                  alt="image"
                  style={{
                    width: "54px",
                    height: "54px",
                  }}
                />
              </picture>
            </div>
            <div>
              <p className="text-white text-sm lg:text-base ml-4 mt-2">
                Hosted by {event?.eventHostName}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="flex py-10 px-2">
        <div className="w-9/12 text-2xl">
          <div className="mt-10 pl-20 text-2xl">Event Details - </div>
          <div>
            <p className="text-2xl mt-5 ml-20">{event?.eventDetails}</p>
          </div>
          <div className="mt-10 pl-20 text-2xl">
            Event Attenders - {event?.attendees.length}
            <div>
              {event?.attendees.map((attender: string, index: number) => (
                <button
                  key={index}
                  className="text-2xl p-2 bg-gray-500 mt-5 ml-2 rounded-full"
                >
                  {/* {attender.slice(0, 1).toUpperCase()} */}
                  {attender
                    .split(" ")
                    .map((name) => name.charAt(0).toUpperCase())
                    .join("")}
                </button>
              ))}
            </div>
          </div>

          {validateRSVP() ? (
            <div className="mt-4 ml-20 w-80 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-4">
              You have already registered for this event.
            </div>
          ) : (
            <div className="mt-4 ml-20">
              <button
                onClick={registerAttendee}
                className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600"
              >
                RSVP
              </button>
            </div>
          )}
          {rsvpSuccess && (
            <div className="mt-4 ml-20 w-80 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 mt-4">
              RSVP Successful. Thank you for registering.
            </div>
          )}
          {rsvpError && (
            <div className="mt-4 ml-20 w-80 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 mt-4">
              RSVP Failed. Please try again later.
            </div>
          )}
        </div>
        <div className="w-3/12 text-2xl mr-10">
          <div className="mt-10 text-2xl">
            Event Location -
            <p className="text-2xl font-bold">{event?.eventLocation}</p>
          </div>
          <div className="mt-4 text-2xl">
            Event Date -
            <p className="text-2xl font-bold">
              {handleDate(event?.eventStartDate.seconds)} to{" "}
              {handleDate(event?.eventEndDate.seconds)}
            </p>
          </div>

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15544.544757459758!2d77.5733936!3d13.0905541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1689331556356!5m2!1sen!2sin"
            width="400"
            height="370"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default EventDetailsPage;
