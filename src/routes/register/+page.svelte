<script lang="ts">
  import { toast } from '@zerodevx/svelte-toast'
	import Button from "../../components/ui/Button.svelte";
	import Form from "../../components/ui/Form.svelte";
  import TextInput from "../../components/ui/TextInput.svelte";
	import { showErrorToast, showSuccessToast } from '../../helpers/toasts.helper';
  let username = ''
  let password = ''
  let confPassword = ''
  const handleSubmit = async(e: Event) => {
    e.preventDefault()
    if (username == '') {
      showErrorToast('Username cannot be empty!', {duration: 3000})
      return
    }
    if (password == '') {
      showErrorToast('Password cannot be empty!', {duration: 3000})
      return
    }
    if (password !== confPassword) {
      showErrorToast('Passwords not matching!', {duration: 3000})
      return
    }
    const response = await fetch('/api/register', {
				method: 'POST',
				body: JSON.stringify({ username, password }),
				headers: {
					'Content-Type': 'application/json'
				}
		}).catch((e) => {
      showErrorToast('Error connecting to server!', {duration: 3000})
      console.log(e)
      return
    });
    if (response) {
      console.log(response)
      showSuccessToast('Registration successful!', {duration: 3000})
    }
  }
</script>
<Form handleSubmit={handleSubmit}>
  <h1>Registration Form</h1>
  <TextInput bind:value={username} placeholder="Username" variant="textbox" />
  <TextInput bind:value={password} placeholder="Password" variant="password" />
  <TextInput bind:value={confPassword} placeholder="Confirm Password" variant="password" />
  <Button label="Register!" type="submit" />
</Form>


