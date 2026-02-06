<script lang="ts">
  import { language, translations } from "$lib/stores/language";

  let currentLang: "ar" | "en" = "ar";
  language.subscribe((value) => {
    currentLang = value;
  });
  $: t = translations[currentLang];

  // Info Popover State
  let activeInfoField = "";

  // Form Data
  let formData = {
    age: 50,
    sex: 1, // 1 = male, 0 = female
    cp: 0, // chest pain type
    trestbps: 120,
    chol: 200,
    fbs: 0, // fasting blood sugar > 120 mg/dl
    restecg: 0,
    thalach: 150,
    exang: 0, // exercise induced angina
    oldpeak: 0.0,
    slope: 0,
    ca: 0, // number of major vessels
    thal: 0,
  };

  let isCalculating = false;
  let predictionResult: any = null;

  const API_BASE = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:5000";

  async function calculateRisk() {
    isCalculating = true;
    predictionResult = null;
    let errorMsg = "";
    try {
      const response = await fetch(`${API_BASE}/api/prediction/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Age: formData.age,
          Sex: formData.sex,
          CP: formData.cp,
          TrestBPS: formData.trestbps,
          Chol: formData.chol,
          FBS: formData.fbs,
          RestECG: formData.restecg,
          Thalach: formData.thalach,
          Exang: formData.exang,
          Oldpeak: formData.oldpeak,
          Slope: formData.slope,
          CA: formData.ca,
          Thal: formData.thal,
        }),
      });
      if (!response.ok) {
        const err = await response.json();
        errorMsg = err.error || "API error";
        throw new Error(errorMsg);
      }
      const data = await response.json();
      console.log("API Response:", data);
      predictionResult = data;
    } catch (err) {
      console.error("Error:", err);
      predictionResult = null;
      alert(errorMsg || "Failed to get prediction. Please try again.");
    } finally {
      isCalculating = false;
    }
  }

  function resetForm() {
    formData = {
      age: 50,
      sex: 1,
      cp: 0,
      trestbps: 120,
      chol: 200,
      fbs: 0,
      restecg: 0,
      thalach: 150,
      exang: 0,
      oldpeak: 0.0,
      slope: 0,
      ca: 0,
      thal: 0,
    };
    predictionResult = null;
  }

  function toggleInfo(field: string) {
    if (activeInfoField === field) {
      activeInfoField = "";
    } else {
      activeInfoField = field;
    }
  }

  function closeInfo() {
    activeInfoField = "";
  }

  $: riskLevelLabels = {
    low: t.lowRisk,
    moderate: t.moderateRisk,
    high: t.highRisk,
  };

  function getRiskLevelColor(level: string) {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-100";
      case "moderate":
        return "text-orange-600 bg-orange-100";
      case "high":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  }
</script>

<section id="calculator" class="py-20 bg-gray-50">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">{t.calculatorTitle}</h2>
      <p class="text-xl text-gray-600">{t.calculatorSubtitle}</p>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- Form Section -->
      <div class="lg:col-span-2">
        <div class="card">
          <form on:submit|preventDefault={calculateRisk}>
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Age -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.age}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('age')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن العمر"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="number"
                  bind:value={formData.age}
                  min="20"
                  max="100"
                  class="input-field"
                  required
                />
                {#if activeInfoField === 'age'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.ageInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Sex -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.sex}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('sex')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن الجنس"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.sex} class="input-field">
                  <option value={1}>{t.male}</option>
                  <option value={0}>{t.female}</option>
                </select>
                {#if activeInfoField === 'sex'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.sexInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Chest Pain Type -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.cp}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('cp')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن ألم الصدر"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.cp} class="input-field">
                  <option value={0}>{t.cpType1}</option>
                  <option value={1}>{t.cpType2}</option>
                  <option value={2}>{t.cpType3}</option>
                  <option value={3}>{t.cpType4}</option>
                </select>
                {#if activeInfoField === 'cp'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.cpInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Resting Blood Pressure -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.trestbps}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('trestbps')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن ضغط الدم"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="number"
                  bind:value={formData.trestbps}
                  min="80"
                  max="200"
                  class="input-field"
                  required
                />
                {#if activeInfoField === 'trestbps'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.trestbpsInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Cholesterol -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.chol}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('chol')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن الكوليسترول"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="number"
                  bind:value={formData.chol}
                  min="100"
                  max="600"
                  class="input-field"
                  required
                />
                {#if activeInfoField === 'chol'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.cholInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Fasting Blood Sugar -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.fbs}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('fbs')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن سكر الدم"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.fbs} class="input-field">
                  <option value={0}>{t.no}</option>
                  <option value={1}>{t.yes}</option>
                </select>
                {#if activeInfoField === 'fbs'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.fbsInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Resting ECG -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.restecg}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('restecg')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن تخطيط القلب"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.restecg} class="input-field">
                  <option value={0}>{t.restecgType0}</option>
                  <option value={1}>{t.restecgType1}</option>
                  <option value={2}>{t.restecgType2}</option>
                </select>
                {#if activeInfoField === 'restecg'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.restecgInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Max Heart Rate -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.thalach}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('thalach')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن معدل ضربات القلب"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="number"
                  bind:value={formData.thalach}
                  min="60"
                  max="220"
                  class="input-field"
                  required
                />
                {#if activeInfoField === 'thalach'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.thalachInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Exercise Induced Angina -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.exang}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('exang')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن الذبحة الصدرية"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.exang} class="input-field">
                  <option value={0}>{t.no}</option>
                  <option value={1}>{t.yes}</option>
                </select>
                {#if activeInfoField === 'exang'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.exangInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Oldpeak -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.oldpeak}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('oldpeak')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن انخفاض ST"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <input
                  type="number"
                  bind:value={formData.oldpeak}
                  min="0"
                  max="6"
                  step="0.1"
                  class="input-field"
                  required
                />
                {#if activeInfoField === 'oldpeak'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.oldpeakInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Slope -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.slope}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('slope')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن ميل ST"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.slope} class="input-field">
                  <option value={0}>{t.slopeType0}</option>
                  <option value={1}>{t.slopeType1}</option>
                  <option value={2}>{t.slopeType2}</option>
                </select>
                {#if activeInfoField === 'slope'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.slopeInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- CA -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.ca}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('ca')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن الأوعية الدموية"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.ca} class="input-field">
                  <option value={0}>0</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                </select>
                {#if activeInfoField === 'ca'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.caInfo}</p>
                  </div>
                {/if}
              </div>

              <!-- Thal -->
              <div class="relative">
                <div class="flex items-center gap-2 mb-2">
                  <label class="label">{t.thal}</label>
                  <button
                    type="button"
                    on:click={() => toggleInfo('thal')}
                    class="text-blue-500 hover:text-blue-700 focus:outline-none transition-colors"
                    aria-label="معلومات عن اختبار الثاليوم"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>
                  </button>
                </div>
                <select bind:value={formData.thal} class="input-field">
                  <option value={0}>{t.thalType0}</option>
                  <option value={1}>{t.thalType1}</option>
                  <option value={2}>{t.thalType2}</option>
                  <option value={3}>{t.thalType3}</option>
                </select>
                {#if activeInfoField === 'thal'}
                  <div class="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg shadow-sm" dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
                    <p class="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{t.thalInfo}</p>
                  </div>
                {/if}
              </div>
            </div>

            <!-- Buttons -->
            <div class="flex gap-4 mt-8">
              <button
                type="submit"
                class="btn btn-primary flex-1"
                disabled={isCalculating}
              >
                {#if isCalculating}
                  <svg
                    class="animate-spin w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  {t.calculating}
                {:else}
                  {t.calculate}
                {/if}
              </button>

              <button
                type="button"
                on:click={resetForm}
                class="btn btn-outline"
              >
                {t.reset}
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Results Section -->
      <div class="lg:col-span-1">
        {#if predictionResult}
          <div class="space-y-4">
            <!-- Overall Risk -->
            <div
              class="card bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200"
            >
              <h3 class="text-xl font-bold text-gray-900 mb-4">
                {t.riskLevel}
              </h3>

              <div class="text-center mb-6">
                <div
                  class="text-6xl font-bold mb-2 {getRiskLevelColor(
                    predictionResult.ensemble.riskLevel,
                  )}"
                >
                  {predictionResult.ensemble.riskScore <= 1
                    ? (predictionResult.ensemble.riskScore * 100).toFixed(2)
                    : predictionResult.ensemble.riskScore.toFixed(2)}%
                </div>
                <div
                  class="inline-block px-4 py-2 rounded-full font-bold {getRiskLevelColor(
                    predictionResult.ensemble.riskLevel,
                  )}"
                >
                  {riskLevelLabels[predictionResult.ensemble.riskLevel] ||
                    predictionResult.ensemble.riskLevel}
                </div>
              </div>

              <div class="text-center text-gray-700">
                {predictionResult.ensemble.prediction === 1
                  ? t.hasDisease
                  : t.noDisease}
              </div>
            </div>

            <!-- Model Predictions -->
            <div class="card">
              <h3 class="text-lg font-bold text-gray-900 mb-4">
                {t.modelsTitle}
              </h3>

              <!-- KNN -->
              <div class="mb-3 p-3 bg-blue-50 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-gray-700">{t.knnModel}</span>
                  <span class="text-sm text-gray-600"
                    >{t.accuracy}: {predictionResult.knn.accuracy}%</span
                  >
                </div>
                <div class="text-sm">
                  {t.confidence}:
                  <span class="font-bold text-blue-600"
                    >{predictionResult.knn.confidence.toFixed(1)}%</span
                  >
                </div>
              </div>

              <!-- Naive Bayes -->
              <div class="mb-3 p-3 bg-green-50 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-gray-700"
                    >{t.naiveBayesModel}</span
                  >
                  <span class="text-sm text-gray-600"
                    >{t.accuracy}: {predictionResult.naiveBayes.accuracy}%</span
                  >
                </div>
                <div class="text-sm">
                  {t.confidence}:
                  <span class="font-bold text-green-600"
                    >{predictionResult.naiveBayes.confidence.toFixed(1)}%</span
                  >
                </div>
              </div>

              <!-- Decision Tree -->
              <div class="p-3 bg-orange-50 rounded-lg">
                <div class="flex justify-between items-center mb-1">
                  <span class="font-semibold text-gray-700"
                    >{t.decisionTreeModel}</span
                  >
                  <span class="text-sm text-gray-600"
                    >{t.accuracy}: {predictionResult.decisionTree
                      .accuracy}%</span
                  >
                </div>
                <div class="text-sm">
                  {t.confidence}:
                  <span class="font-bold text-orange-600"
                    >{predictionResult.decisionTree.confidence.toFixed(
                      1,
                    )}%</span
                  >
                </div>
              </div>
            </div>

            <!-- Disclaimer -->
            <div class="card bg-yellow-50 border-yellow-200 border">
              <p class="text-xs text-gray-700">
                {currentLang === "ar"
                  ? "⚠️ هذا النظام للأغراض البحثية فقط ولا يحل محل الاستشارة الطبية المتخصصة."
                  : "⚠️ This system is for research purposes only and does not replace professional medical consultation."}
              </p>
            </div>
          </div>
        {:else}
          <div class="card text-center py-12">
            <svg
              class="w-24 h-24 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <p class="text-gray-500">
              {currentLang === "ar"
                ? 'أدخل البيانات الطبية واضغط على "احسب المخاطر" للحصول على التقييم'
                : 'Enter medical data and click "Calculate Risk" to get assessment'}
            </p>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
