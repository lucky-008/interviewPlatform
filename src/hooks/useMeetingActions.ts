import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation"
import {toast} from "react-hot-toast"

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const createInsatntMeeting = async () => {
    if(!client) return;
    try {
        const id = crypto.randomUUID();
        const call = client.call("default",id);
        await call.getOrCreate({
            data: {
                starts_at: new Date().toISOString(),
                custom: {
                    description: "Instant Meeting",
                }
            }
        });
        router.push(`/meeting/${call.id}`);
        toast.success("Meeting Created");
    } catch (error) {
        toast.error("Failed to create meeting")
    }
  };
  const joinMeeting = (callId: string) => {
    if(!client) return toast.error("Failed to join meeting,Please try again later")
    router.push(`/meeting/${callId}`)
  }
  return {
    createInsatntMeeting,joinMeeting
  }
}

export default useMeetingActions
