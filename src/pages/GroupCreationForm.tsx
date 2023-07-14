import Navbar from "@/components/Navbar";
import { auth, db, storage } from "@/firebase";
import { collection, doc, setDoc } from "@firebase/firestore";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "@firebase/storage";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Image from "next/image";

const GroupCreationForm = () => {
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null | Blob>(null);
  const router = useRouter();

  const Tags: string[] = [
    "Select Tag",
    "Web3.0",
    "European football",
    "Professional Networking",
    "Technology",
    "Sports fan",
    "Reading",
    "Blockchain",
    "Gaming",
    "Music",
    "Art",
    "Movies",
    "Food",
    "Travel",
    "Fitness",
    "Photography",
    "Fashion",
    "Dance",
    "Writing",
    "Outdoors",
    "Pets",
    "Cars",
    "Politics",
    "Science",
    "History",
    "Business",
    "Finance",
    "Health",
    "Spirituality",
    "Religion",
    "Languages",
    "Family",
    "Crafts",
    "Education",
    "Career & Jobs",
    "Socializing",
    "Volunteering",
    "Hobbies",
    "Other",
  ];

  const Locations: string[] = [
    "Select Location",
    "New Delhi",
    "Mumbai",
    "Bangalore",
    "Chennai",
    "Kolkata",
    "Pune",
    "Hyderabad",
    "Ahmedabad",
    "Jaipur",
    "Surat",
    "Lucknow",
    "Kanpur",
    "Nagpur",
    "Patna",
    "Indore",
    "Thane",
    "Bhopal",
    "Visakhapatnam",
    "Vadodara",
    "Firozabad",
    "Ludhiana",
    "Agra",
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Image", image);

    if (localStorage.getItem("user") !== null) {
      console.log("User is logged in");
      console.log("User:", localStorage.getItem("user"));
      console.log("email", auth.currentUser?.email);
    } else {
      console.log("User is not logged in");
      router.push("/Login");
    }

    if (image === null) {
      alert("Image is null");
    }

    const imageRef = ref(storage, `images/${image?.name + v4()}`);
    console.log("imageRef", imageRef);
    uploadBytes(imageRef, image as Blob).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        handleUpload(url);
      });
    });

    // // adding data to firestore
  };

  const handleUpload = async (url: any) => {
    const docRef = doc(collection(db, "Groups"));
    await setDoc(docRef, {
      Location: location,
      Tags: tags,
      Name: name,
      Description: description,
      admin: auth.currentUser?.email,
      Image: url,
    });

    // Reset form fields
    setLocation("");
    setTags([]);
    setName("");
    setDescription("");
    setImage(null);
    alert("Group created successfully");
  };

  const handleLocationChange = (e: any) => {
    setLocation(e.target.value);
  };

  let selectedTags: string[] = [];
  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    console.log("selectedTags:", selectedTags);

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        setTags([...tags, options[i].value]);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-64"
        >
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 font-bold mb-2"
            >
              Location:
            </label>
            <select
              id="location"
              value={location}
              onChange={handleLocationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              {Locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4 max-w-100">
            <label
              htmlFor="tags"
              className="block text-gray-700 font-bold mb-2"
            >
              Tags:
            </label>
            <div className="w-100 flex flex-wrap">
              {tags.map((tag) => (
                <span
                  onClick={() => {
                    setTags(tags.filter((t) => t !== tag));
                  }}
                  key={tag}
                  className="py-2 px-2 w-20 bg-gray-800 text-white rounded hover:bg-gray-600 mr-2 mb-2"
                >
                  <span>{tag}</span>
                  <button className="ml-2 text-gray-500">X</button>
                </span>
              ))}
            </div>
            <select
              id="tags"
              value={tags}
              onChange={handleTagsChange}
              className="w-full px-3 py-2 border border-gray-300 rounded mt-4"
            >
              {Tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 font-bold mb-2"
            >
              Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={(e) => setImage(e.target.files![0])}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
};

export default GroupCreationForm;
