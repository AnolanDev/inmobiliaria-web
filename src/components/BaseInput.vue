<template>
  <div>
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    
    <div class="relative">
      <component
        :is="inputComponent"
        :id="id"
        v-model="modelValue"
        :class="inputClasses"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        :rows="type === 'textarea' ? rows : undefined"
        v-bind="$attrs"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
      
      <div v-if="$slots.icon" class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <slot name="icon" />
      </div>
    </div>
    
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
    <p v-else-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea' | 'select'
  label?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  id?: string
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
  rows: 3
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

const inputComponent = computed(() => {
  if (props.type === 'textarea') return 'textarea'
  if (props.type === 'select') return 'select'
  return 'input'
})

const inputClasses = computed(() => {
  const base = 'block w-full rounded-lg border-gray-300 shadow-sm transition-colors duration-200'
  const focus = 'focus:ring-primary-500 focus:border-primary-500'
  const error = props.error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : ''
  const disabled = props.disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : ''
  const sizing = props.type === 'textarea' ? 'px-3 py-2' : 'px-3 py-2.5'
  
  return [base, focus, error, disabled, sizing].join(' ')
})
</script>