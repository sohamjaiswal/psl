import { toast } from '@zerodevx/svelte-toast'
import type { SvelteToastOptions } from '@zerodevx/svelte-toast/stores'

export const showErrorToast = (message: string, opts?: Omit<SvelteToastOptions, 'theme'>) => {
  toast.push(message, {
    theme: {
      '--toastBackground': '#d62828',
      '--toastProgressBackground': '#fff',
      '--toastProgressAfterBackground': '#d62828',
      '--toastColor': '#ffffff'
    },
    ...opts
  })
  return
}

export const showSuccessToast = (message: string, opts?: Omit<SvelteToastOptions, 'theme'>) => {
  toast.push(message, {
    theme: {
      '--toastBackground': '#3a6ea5',
      '--toastProgressBackground': '#fff',
      '--toastProgressAfterBackground': '#3a6ea5',
      '--toastColor': '#ffffff'
    },
    ...opts
  })
  return
}

export const showWarningToast = (message: string, opts?: Omit<SvelteToastOptions, 'theme'>) => {
  toast.push(message, {
    theme: {
      '--toastBackground': '#f77f00',
      '--toastProgressBackground': '#fff',
      '--toastProgressAfterBackground': '#f77f00',
      '--toastColor': '#ffffff'
    },
    ...opts
  })
  return
}