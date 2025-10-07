<template>
  <AppLayout>
    <!-- Hero Section -->
    <div
      class="bg-gradient-to-br from-caribbean-600 via-caribbean-700 to-caribbean-800 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div class="text-center">
          <h1 class="text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Contáctanos
          </h1>
          <p class="text-xl lg:text-2xl text-caribbean-100 max-w-3xl mx-auto">
            Estamos aquí para ayudarte a encontrar la propiedad de tus sueños
          </p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <!-- Contact Information -->
        <div class="space-y-8">
          <div>
            <h2 class="text-3xl font-bold text-neutral-900 mb-6">
              Información de contacto
            </h2>
            <p class="text-lg text-neutral-600 mb-8">
              Nuestro equipo está listo para atenderte y brindarte la mejor
              asesoría inmobiliaria.
            </p>
          </div>

          <!-- Contact Cards -->
          <div class="space-y-6">
            <!-- Email Card -->
            <div
              class="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-caribbean-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-caribbean-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-1">
                    Email
                  </h3>
                  <p class="text-neutral-600 mb-2">Escríbenos directamente</p>
                  <a
                    href="mailto:comercial@tierrasonada.com"
                    class="text-caribbean-600 hover:text-caribbean-700 font-medium transition-colors duration-200"
                  >
                    comercial@tierrasonada.com
                  </a>
                </div>
              </div>
            </div>

            <!-- Phone Card -->
            <div
              class="bg-white p-6 rounded-2xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div class="flex items-start space-x-4">
                <div class="flex-shrink-0">
                  <div
                    class="w-12 h-12 bg-nature-100 rounded-xl flex items-center justify-center"
                  >
                    <svg
                      class="w-6 h-6 text-nature-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                </div>
                <div class="flex-1">
                  <h3 class="text-lg font-semibold text-neutral-900 mb-1">
                    Teléfono
                  </h3>
                  <p class="text-neutral-600 mb-2">
                    Llámanos o escríbenos por WhatsApp
                  </p>
                  <div
                    class="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0"
                  >
                    <a
                      href="tel:+573116598438"
                      class="text-nature-600 hover:text-nature-700 font-medium transition-colors duration-200"
                    >
                      +57 311 659 8438
                    </a>
                    <a
                      href="https://wa.me/573116598438"
                      target="_blank"
                      class="inline-flex items-center px-4 py-2 bg-nature-500 hover:bg-nature-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                    >
                      <svg
                        class="w-4 h-4 mr-2"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                        />
                      </svg>
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div
              class="bg-neutral-50 p-6 rounded-2xl border border-neutral-200"
            >
              <h3
                class="text-lg font-semibold text-neutral-900 mb-4 flex items-center"
              >
                <svg
                  class="w-5 h-5 text-neutral-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Horarios de atención
              </h3>
              <div class="space-y-2 text-neutral-600">
                <div class="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span class="font-medium">8:00 AM - 6:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Sábados:</span>
                  <span class="font-medium">9:00 AM - 4:00 PM</span>
                </div>
                <div class="flex justify-between">
                  <span>Domingos:</span>
                  <span class="font-medium">Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Contact Form -->
        <div
          class="bg-white rounded-3xl shadow-xl border border-neutral-100 p-8 lg:p-10"
        >
          <div class="mb-8">
            <h2 class="text-3xl font-bold text-neutral-900 mb-4">
              Envíanos un mensaje
            </h2>
            <p class="text-neutral-600">
              Completa el formulario y nos pondremos en contacto contigo lo
              antes posible.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
            <!-- Name Field -->
            <div>
              <label
                for="name"
                class="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Nombre completo *
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                autocomplete="name"
                :aria-invalid="!!errors.name"
                :aria-describedby="errors.name ? 'name-error' : undefined"
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-neutral-50 focus:bg-white',
                  errors.name
                    ? 'border-coral-300 focus:border-coral-500 focus:ring-coral-200'
                    : 'border-neutral-200 focus:border-caribbean-500 focus:ring-caribbean-200',
                ]"
                placeholder="Tu nombre completo"
                @input="clearError('name')"
                @blur="validateField('name', formData.name)"
              />
              <p
                v-if="errors.name"
                id="name-error"
                class="mt-2 text-sm text-coral-600 flex items-center"
                role="alert"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.name }}
              </p>
            </div>

            <!-- Email Field -->
            <div>
              <label
                for="email"
                class="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Email *
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                autocomplete="email"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'email-error' : undefined"
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-neutral-50 focus:bg-white',
                  errors.email
                    ? 'border-coral-300 focus:border-coral-500 focus:ring-coral-200'
                    : 'border-neutral-200 focus:border-caribbean-500 focus:ring-caribbean-200',
                ]"
                placeholder="tu@email.com"
                @input="clearError('email')"
                @blur="validateField('email', formData.email)"
              />
              <p
                v-if="errors.email"
                id="email-error"
                class="mt-2 text-sm text-coral-600 flex items-center"
                role="alert"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.email }}
              </p>
            </div>

            <!-- Phone Field -->
            <div>
              <label
                for="phone"
                class="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Teléfono *
              </label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                required
                autocomplete="tel"
                :aria-invalid="!!errors.phone"
                :aria-describedby="errors.phone ? 'phone-error' : undefined"
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-neutral-50 focus:bg-white',
                  errors.phone
                    ? 'border-coral-300 focus:border-coral-500 focus:ring-coral-200'
                    : 'border-neutral-200 focus:border-caribbean-500 focus:ring-caribbean-200',
                ]"
                placeholder="311 659 8438 o +57 300 123 4567"
                @input="clearError('phone')"
                @blur="validateField('phone', formData.phone)"
              />
              <p
                v-if="errors.phone"
                id="phone-error"
                class="mt-2 text-sm text-coral-600 flex items-center"
                role="alert"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.phone }}
              </p>
            </div>

            <!-- Preferred Contact Method -->
            <div>
              <label class="block text-sm font-semibold text-neutral-700 mb-3">
                Método de contacto preferido
              </label>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label class="relative flex cursor-pointer">
                  <input
                    v-model="formData.preferred_contact"
                    type="radio"
                    value="email"
                    class="sr-only"
                  />
                  <div
                    :class="[
                      'flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200',
                      formData.preferred_contact === 'email'
                        ? 'border-caribbean-500 bg-caribbean-50 text-caribbean-700'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300',
                    ]"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span class="text-sm font-medium">Email</span>
                  </div>
                </label>

                <label class="relative flex cursor-pointer">
                  <input
                    v-model="formData.preferred_contact"
                    type="radio"
                    value="phone"
                    class="sr-only"
                  />
                  <div
                    :class="[
                      'flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200',
                      formData.preferred_contact === 'phone'
                        ? 'border-caribbean-500 bg-caribbean-50 text-caribbean-700'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300',
                    ]"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span class="text-sm font-medium">Teléfono</span>
                  </div>
                </label>

                <label class="relative flex cursor-pointer">
                  <input
                    v-model="formData.preferred_contact"
                    type="radio"
                    value="whatsapp"
                    class="sr-only"
                  />
                  <div
                    :class="[
                      'flex-1 flex items-center justify-center px-4 py-3 rounded-xl border-2 transition-all duration-200',
                      formData.preferred_contact === 'whatsapp'
                        ? 'border-nature-500 bg-nature-50 text-nature-700'
                        : 'border-neutral-200 bg-neutral-50 text-neutral-700 hover:border-neutral-300',
                    ]"
                  >
                    <svg
                      class="w-5 h-5 mr-2"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                      />
                    </svg>
                    <span class="text-sm font-medium">WhatsApp</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Budget Range -->
            <div>
              <label
                for="budget"
                class="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Rango de presupuesto (opcional)
              </label>
              <select
                id="budget"
                v-model="formData.budget_range"
                class="w-full px-4 py-3 rounded-xl border-2 border-neutral-200 bg-neutral-50 focus:bg-white focus:border-caribbean-500 focus:ring-caribbean-200 transition-all duration-200"
              >
                <option value="">Selecciona un rango</option>
                <option value="0-100">Hasta $100M</option>
                <option value="100-200">$100M - $200M</option>
                <option value="200-300">$200M - $300M</option>
                <option value="300-500">$300M - $500M</option>
                <option value="500-1000">$500M - $1.000M</option>
                <option value="1000+">Más de $1.000M</option>
              </select>
            </div>

            <!-- Message Field -->
            <div>
              <label
                for="message"
                class="block text-sm font-semibold text-neutral-700 mb-2"
              >
                Mensaje *
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                required
                rows="5"
                :aria-invalid="!!errors.message"
                :aria-describedby="errors.message ? 'message-error' : undefined"
                :class="[
                  'w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 bg-neutral-50 focus:bg-white resize-none',
                  errors.message
                    ? 'border-coral-300 focus:border-coral-500 focus:ring-coral-200'
                    : 'border-neutral-200 focus:border-caribbean-500 focus:ring-caribbean-200',
                ]"
                placeholder="Cuéntanos en qué podemos ayudarte..."
                @input="clearError('message')"
                @blur="validateField('message', formData.message)"
              ></textarea>
              <p
                v-if="errors.message"
                id="message-error"
                class="mt-2 text-sm text-coral-600 flex items-center"
                role="alert"
              >
                <svg
                  class="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
                {{ errors.message }}
              </p>
            </div>

            <!-- Submit Button -->
            <div class="pt-4">
              <button
                type="submit"
                :disabled="loading || Object.keys(errors).length > 0"
                :class="[
                  'w-full px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-4',
                  loading || Object.keys(errors).length > 0
                    ? 'bg-neutral-400 text-neutral-200 cursor-not-allowed'
                    : 'bg-gradient-to-r from-caribbean-600 to-caribbean-700 hover:from-caribbean-700 hover:to-caribbean-800 text-white shadow-lg hover:shadow-xl focus:ring-caribbean-200 transform hover:scale-[1.02]',
                ]"
                :aria-label="loading ? 'Enviando mensaje...' : 'Enviar mensaje de contacto'"
              >
                <span v-if="loading" class="flex items-center justify-center">
                  <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
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
                  Enviando...
                </span>
                <span v-else>Enviar mensaje</span>
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div
            v-if="success"
            class="success-message mt-6 p-6 bg-gradient-to-r from-nature-50 to-caribbean-50 border-2 border-nature-200 rounded-xl shadow-lg animate-fade-in"
            role="alert"
            aria-live="polite"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-nature-100 rounded-full flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-nature-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-semibold text-nature-800 mb-1">¡Mensaje enviado!</h4>
                <p class="text-nature-700">{{ success }}</p>
                <p class="text-sm text-nature-600 mt-2">Te responderemos en menos de 24 horas.</p>
              </div>
            </div>
          </div>

          <!-- Error Message -->
          <div
            v-if="error"
            class="mt-6 p-6 bg-gradient-to-r from-coral-50 to-orange-50 border-2 border-coral-200 rounded-xl shadow-lg animate-fade-in"
            role="alert"
            aria-live="polite"
          >
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <div class="w-10 h-10 bg-coral-100 rounded-full flex items-center justify-center">
                  <svg
                    class="w-6 h-6 text-coral-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-semibold text-coral-800 mb-1">Error al enviar</h4>
                <p class="text-coral-700 mb-2">{{ error }}</p>
                <div class="flex space-x-3">
                  <button 
                    @click="error = null" 
                    class="text-sm text-coral-600 hover:text-coral-800 font-medium underline"
                  >
                    Cerrar
                  </button>
                  <span class="text-coral-400">•</span>
                  <a 
                    href="tel:+573116598438" 
                    class="text-sm text-coral-600 hover:text-coral-800 font-medium underline"
                  >
                    Llamar directamente
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-neutral-50 border-t border-neutral-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center">
          <h3 class="text-2xl font-bold text-neutral-900 mb-4">
            ¿Necesitas ayuda inmediata?
          </h3>
          <p class="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Nuestro equipo de expertos está disponible para brindarte asesoría
            personalizada.
          </p>
          <div
            class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <a
              href="tel:+573116598438"
              class="inline-flex items-center px-6 py-3 bg-caribbean-600 hover:bg-caribbean-700 text-white font-medium rounded-xl transition-colors duration-200"
            >
              <svg
                class="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              Llamar ahora
            </a>
            <a
              href="https://wa.me/573116598438"
              target="_blank"
              class="inline-flex items-center px-6 py-3 bg-nature-500 hover:bg-nature-600 text-white font-medium rounded-xl transition-colors duration-200"
            >
              <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import AppLayout from "@/components/AppLayout.vue";
import { useContactStore } from "@/stores/contact";
import type { ContactForm } from "@/types";

const contactStore = useContactStore();

const formData = reactive<ContactForm>({
  name: "",
  email: "",
  phone: "",
  message: "",
  preferred_contact: "email",
  budget_range: "",
});

const errors = reactive<Record<string, string>>({});
const loading = ref(false);
const error = ref<string | null>(null);
const success = ref<string | null>(null);

const validateForm = (): boolean => {
  const newErrors: Record<string, string> = {};

  if (!formData.name.trim()) {
    newErrors.name = "El nombre es requerido";
  } else if (formData.name.trim().length < 2) {
    newErrors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (!formData.email.trim()) {
    newErrors.email = "El email es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Por favor ingresa un email válido";
  }

  if (!formData.phone.trim()) {
    newErrors.phone = "El teléfono es requerido";
  } else {
    // Regex más específica para números colombianos
    const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, "");
    if (!/^(\+?57)?[3][0-9]{9}$/.test(cleanPhone) && !/^(\+?57)?[1-8][0-9]{6,7}$/.test(cleanPhone)) {
      newErrors.phone = "Ingresa un número válido (ej: +57 300 123 4567 o 311 659 8438)";
    }
  }

  if (!formData.message.trim()) {
    newErrors.message = "El mensaje es requerido";
  } else if (formData.message.trim().length < 10) {
    newErrors.message = "El mensaje debe tener al menos 10 caracteres";
  }

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const clearError = (field: string) => {
  if (errors[field]) {
    delete errors[field];
  }
};

// Real-time validation
const validateField = (field: string, value: string) => {
  switch (field) {
    case 'name':
      if (!value.trim()) {
        errors.name = "El nombre es requerido";
      } else if (value.trim().length < 2) {
        errors.name = "El nombre debe tener al menos 2 caracteres";
      } else {
        delete errors.name;
      }
      break;
    
    case 'email':
      if (!value.trim()) {
        errors.email = "El email es requerido";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors.email = "Por favor ingresa un email válido";
      } else {
        delete errors.email;
      }
      break;
    
    case 'phone':
      if (!value.trim()) {
        errors.phone = "El teléfono es requerido";
      } else {
        const cleanPhone = value.replace(/[\s\-\(\)]/g, "");
        if (!/^(\+?57)?[3][0-9]{9}$/.test(cleanPhone) && !/^(\+?57)?[1-8][0-9]{6,7}$/.test(cleanPhone)) {
          errors.phone = "Ingresa un número válido (ej: +57 300 123 4567)";
        } else {
          delete errors.phone;
        }
      }
      break;
    
    case 'message':
      if (!value.trim()) {
        errors.message = "El mensaje es requerido";
      } else if (value.trim().length < 10) {
        errors.message = "El mensaje debe tener al menos 10 caracteres";
      } else {
        delete errors.message;
      }
      break;
  }
};

const resetForm = () => {
  formData.name = "";
  formData.email = "";
  formData.phone = "";
  formData.message = "";
  formData.preferred_contact = "email";
  formData.budget_range = "";
  Object.keys(errors).forEach((key) => delete errors[key]);
};

const handleSubmit = async () => {
  error.value = null;
  success.value = null;

  if (!validateForm()) {
    // Focus on first error field
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = document.getElementById(firstErrorField);
      element?.focus();
    }
    return;
  }

  loading.value = true;

  try {
    const response = await contactStore.submitContact({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: formData.message.trim(),
      preferred_contact: formData.preferred_contact,
      budget_range: formData.budget_range || null,
      property_id: null,
      project_id: null,
    });

    // Success
    success.value = response.message || "¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.";
    resetForm();
    
    // Scroll to success message smoothly
    setTimeout(() => {
      const successElement = document.querySelector('.success-message');
      if (successElement) {
        successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);

  } catch (err: any) {
    console.error("Error submitting contact form:", err);
    console.error("Error details:", {
      status: err.response?.status,
      statusText: err.response?.statusText,
      data: err.response?.data,
      headers: err.response?.headers
    });
    
    if (err.response?.status === 500) {
      error.value = "Error interno del servidor. Por favor, inténtalo más tarde o contáctanos directamente por teléfono.";
    } else {
      error.value = err.response?.data?.message || 
                    "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo o contáctanos directamente.";
    }
  } finally {
    loading.value = false;
  }
};
</script>
