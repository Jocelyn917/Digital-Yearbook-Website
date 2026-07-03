import { useState, useEffect } from "react";

export default function PhotoUpload() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("yearbookPhotos");
    if (saved) setPhotos(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("yearbookPhotos", JSON.stringify(photos));
  }, [photos]);

  function handleUpload(e) {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) return;

      const reader = new FileReader();

      reader.onload = () => {
        const newPhoto = {
          id: crypto.randomUUID(),
          src: reader.result,
          caption: "",
          tags: "",
          memory: "",
        };

        setPhotos((prev) => [...prev, newPhoto]);
      };

      reader.readAsDataURL(file);
    });
  }

  function updatePhoto(id, field, value) {
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, [field]: value } : photo
      )
    );
  }

  function deletePhoto(id) {
    setPhotos((prev) => prev.filter((photo) => photo.id !== id));
  }

  return (
    <section className="photo-upload-section">
      <h2>Upload Yearbook Photos</h2>
      <p>Add photos to your digital yearbook gallery.</p>

      <label className="upload-button">
        Upload Photos
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleUpload}
          hidden
        />
      </label>

      {photos.length === 0 ? (
        <div className="empty-gallery">
          No photos yet. Upload class photos, memories, or yearbook pictures.
        </div>
      ) : (
        <div className="photo-gallery">
          {photos.map((photo) => (
            <div className="photo-card" key={photo.id}>
              <img src={photo.src} alt={photo.caption || "Uploaded yearbook"} />

              <input
                type="text"
                placeholder="Caption"
                value={photo.caption}
                onChange={(e) =>
                  updatePhoto(photo.id, "caption", e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Tag people"
                value={photo.tags}
                onChange={(e) =>
                  updatePhoto(photo.id, "tags", e.target.value)
                }
              />

              <textarea
                placeholder="Memory or note"
                value={photo.memory}
                onChange={(e) =>
                  updatePhoto(photo.id, "memory", e.target.value)
                }
              />

              <button onClick={() => deletePhoto(photo.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
