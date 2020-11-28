import firebase from 'firebase/app';
import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { db } from '../firebase';

const Editor = ({ e }) => {
  const { saas, setSaas } = useData();

  const handleSave = async (id) => {
    const newSaas = saas.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isEditable: !item.isEditable,
        };

        return updatedItem;
      }

      return item;
    });
    try {
      await db.collection('saas').doc(id).update({
        title,
        tagline,
        category,
        link,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setFormData({
      ...formData,
      title: '',
      tagline: '',
      category: '',
      link: '',
    });
    setSaas(newSaas);
  };

  const handleCancel = (id) => {
    const newSaas = saas.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          isEditable: !item.isEditable,
        };

        return updatedItem;
      }

      return item;
    });
    setSaas(newSaas);
  };

  const inputFields = ['title', 'tagline', 'category', 'link'];
  const [formData, setFormData] = useState({
    title: e.title,
    tagline: e.tagline,
    category: e.category,
    link: e.link,
  });

  const { title, tagline, category, link } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="flex flex-col border-2 border-blue-500 m-6 p-2 rounded-lg">
      <h1>Title:</h1>
      <input
        name="title"
        className="border border-red-400 rounded-lg focus:outline-none px-4 py-1"
        value={title}
        onChange={onChange}
      />

      <h1>Tagline:</h1>
      <input
        name="tagline"
        className="border border-red-400 rounded-lg focus:outline-none px-4 py-1"
        value={tagline}
        onChange={onChange}
      />

      <h1>Category:</h1>
      <input
        name="category"
        className="border border-red-400 rounded-lg focus:outline-none px-4 py-1"
        value={category}
        onChange={onChange}
      />

      <h1>Link</h1>
      <input
        name="link"
        className="border border-red-400 rounded-lg focus:outline-none px-4 py-1"
        value={link}
        onChange={onChange}
      />

      <button
        onClick={() => handleSave(e.id)}
        className="block bg-red-200 rounded-lg p-1 mt-4 w-3/6 self-center focus:outline-none"
      >
        Save
      </button>

      <button
        onClick={() => handleCancel(e.id)}
        className="block bg-red-200 rounded-lg p-1 mt-4 w-3/6 self-center focus:outline-none"
      >
        Cancel
      </button>
    </div>
  );
};

export default Editor;
