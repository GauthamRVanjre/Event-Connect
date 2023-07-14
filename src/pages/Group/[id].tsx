import Navbar from "@/components/Navbar";
import { db } from "@/firebase";
import {
  DocumentData,
  Query,
  collection,
  doc,
  getDoc,
  getDocs,
} from "@firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { type } from "os";
import React, { useEffect, useState } from "react";

const IndividualGroup = () => {
  const router = useRouter();
  const [group, setGroup] = useState<DocumentData | null | Group>(null);
  const { id } = router.query;

  console.log("id:", id);

  type Group = {
    id: string;
    Name: string;
    Description: string;
    Location: string;
    Tags: string[];
    Image: string;
    admin: string;
  };

  const fetchGroupDetails = async () => {
    try {
      // Reference the Firestore collection and document
      const collectionRef = collection(db, "Groups");
      const documentRef = doc(collectionRef, id as string);

      // Fetch the document
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        console.log("docSnap:", docSnap.data());
        setGroup(docSnap.data() as DocumentData);
        console.log("group:", group);
      } else {
        console.log("No matching document");
      }
    } catch (error) {
      console.log("Error getting document:", error);
    }
  };

  useEffect(() => {
    fetchGroupDetails();
  }, [id]);

  return (
    <>
      <Navbar />
      <header className="px-20 w-full border-b border-shadowColor bg-gray-500 py-2 lg:py-6">
        <div className="md:max-w-screen mx-auto">
          <h1>
            <span className="overflow-ellipsis overflow-hidden text-3xl text-white font-bold leading-snug">
              {group?.Name}
            </span>
            {/* <span className="text-4xl font-bold text-white">Group Name</span> */}
          </h1>
          <div className="flex flex-row mt-4 lg:mt-5">
            <div>
              <picture>
                <img
                  className="rounded-full object-cover"
                  src={group?.Image}
                  alt="image"
                  style={{
                    width: "48px",
                    height: "48px",
                  }}
                />
              </picture>
            </div>
            <div>
              <p className="text-white text-sm lg:text-base ml-4 mt-2">
                Group admin {group?.admin}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-end mr-20">
            <div className="py-2 px-4 bg-gray-800 text-white rounded hover:bg-gray-600">
              {/* Create a group */}
              <Link href="/EventCreationForm">Create a new event+</Link>
            </div>
          </div>
        </div>
      </header>

      <main className="flex py-10 px-2">
        <div className="w-9/12 text-2xl">
          <div className="mt-10 pl-20 text-2xl">Group Details</div>
          <div>
            <p className="text-2xl mt-5 ml-20">{group?.Description}</p>
          </div>
          <div>
            <div className="flex flex-row ml-20 mt-2">
              {group?.Tags.map((tag: string) => (
                <div
                  key={tag}
                  className="bg-gray-200 rounded-full py-1 px-3 text-sm font-semibold text-gray-700 mr-2 mt-2"
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10 pl-20 text-2xl">Group Members</div>
        </div>
        <div className="w-3/12 text-2xl mr-10">
          <div className="mt-10 text-2xl">
            Group Location - {group?.Location}
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15544.544757459758!2d77.5733936!3d13.0905541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1689331556356!5m2!1sen!2sin"
            width="400"
            height="450"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </main>
    </>
  );
};

export default IndividualGroup;
