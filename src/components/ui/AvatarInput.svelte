<script lang="ts">
	import { profilePicture } from "../../stores/me.store";

	export let  avatar: string
  let fileinput: any;
	
	const onFileSelected =(e: any)=>{
    let image = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (e: any) => {
      avatar = e.target.result;
    };
  }
	
</script>
<div class="avatarInput">
  {#if avatar}
    <img class="avatar" src="{avatar}" alt="d" />
  {:else}
  <img class="avatar" src="/poop.png" alt="" /> 
  {/if}
  <button class="edit" on:click={()=>{fileinput.click();}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up-fill" viewBox="0 0 16 16">
      <path d="M8 2a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 6.095 0 7.555 0 9.318 0 11.366 1.708 13 3.781 13h8.906C14.502 13 16 11.57 16 9.773c0-1.636-1.242-2.969-2.834-3.194C12.923 3.999 10.69 2 8 2zm2.354 5.146a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2z"/>
    </svg>
  </button>
  <input style="display:none" type="file" accept=".jpg, .jpeg, .png, .webp" on:change={(e)=>onFileSelected(e)} bind:this={fileinput} >
</div>
<style lang="scss">
	.edit{
    border: none;
    height: 45px;
    width: 45px;
		display:flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--primary);
    color: var(--text);
		cursor:pointer;
	}
	.avatar{
    border-radius: 50%;
		display:flex;
		object-fit: cover;
		height:200px;
		width:200px;
	}
  .avatarInput{
    position: relative;
    display: flex;
    width: min-content;
    .edit {
      position: absolute;
      top: 150px;
      left: 150px;
      &:hover {
        transform: scale(102%);
      }
      &:active {
        transform: scale(98%);
      }
    }
  }
</style>