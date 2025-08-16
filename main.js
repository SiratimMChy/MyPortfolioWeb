import { saveRecommendation, listenRecommendations, uploadImage } from "./services.js";

// --- FORM HANDLING (only on recommendation.html) ---
const form = document.getElementById("recForm");
if (form) {
  const successMsg = document.getElementById("successMsg");
  const imageInput = document.getElementById("image");
  const imagePreview = document.getElementById("imagePreview");

  // Image preview
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        imagePreview.src = e.target.result;
        imagePreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.src = "";
      imagePreview.classList.add("hidden");
    }
  });

  // Form submission
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";

    const name = document.getElementById("name").value.trim();
    const designation = document.getElementById("designation").value.trim();
    const company = document.getElementById("company").value.trim();
    const message = document.getElementById("message").value.trim();
    const file = imageInput.files[0];

    if (!name || !designation || !company || !message || !file) {
      alert("Please fill all fields and select an image.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit";
      return;
    }

    try {
      const imageUrl = await uploadImage(file);
      await saveRecommendation({ name, designation, company, message, imageUrl, timestamp: Date.now() });

      form.reset();
      imagePreview.src = "";
      imagePreview.classList.add("hidden");

      successMsg.classList.remove("hidden");
      setTimeout(() => successMsg.classList.add("hidden"), 3000);
    } catch (error) {
      alert("Error submitting recommendation. Try again!");
      console.error("Form Submission Error:", error);
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
  });
}


const recPreviewList = document.getElementById("recPreviewList");

function createRecCard(rec) {
  const card = document.createElement("div");
  card.className = "bg-white dark:bg-slate-700 rounded-xl shadow p-6 w-full max-w-md mx-auto"; 
 
  card.innerHTML = `
    <p class="text-gray-800 dark:text-gray-100 italic mb-4 text-base md:text-lg break-words">
      "${rec.message}"
    </p>
    <div class="flex items-center mt-4">
      ${rec.imageUrl ? `<img src="${rec.imageUrl}" class="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover mr-4" />` : ""}
      <div>
        <p class="font-semibold text-gray-900 dark:text-gray-100 text-sm md:text-lg">${rec.name}</p>
        <p class="text-sm text-gray-600">${rec.designation} at ${rec.company}</p>
        <p class="text-xs md:text-sm text-gray-500">
          ${new Date(rec.timestamp).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>
    </div>
  `;

  return card;
}





if (recPreviewList) {
  listenRecommendations((recommendations) => {
    console.log("Recommendations fetched:", recommendations); // Debugging

    recPreviewList.innerHTML = "";

    if (!recommendations || recommendations.length === 0) {
      recPreviewList.innerHTML = `<p class="text-center text-gray-500 dark:text-gray-400">No recommendations yet.</p>`;
      return;
    }

    // Detect page: show first 3 on index.html, all on recommendation.html
    const isIndex = document.body.contains(document.querySelector("section#recommendationsPreview"));
    const toShow = isIndex ? recommendations.slice(0, 3) : recommendations;

    toShow.forEach((rec) => recPreviewList.appendChild(createRecCard(rec)));
  }, (err) => {
    console.error("Firebase listenRecommendations error:", err);
    recPreviewList.innerHTML = `<p class="text-center text-red-500">Failed to load recommendations.</p>`;
  });
}
