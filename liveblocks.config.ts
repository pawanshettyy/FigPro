import { LiveMap, createClient } from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";

// Create the Liveblocks client with the resolveUsers method
const client = createClient({
  throttle: 16,
  publicApiKey: process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY!,
  async resolveUsers({ userIds }) {
    // Example logic to resolve user data
    // This can be replaced with your actual logic to fetch user info
    // const usersData = await __fetchUsersFromDB__(userIds);
    return userIds.map((userId) => ({
      // Example data structure
      id: userId,
      name: userId, // Replace with actual user name from your data source
      avatar: "path_to_default_avatar.png", // Replace with actual avatar URL
    }));
  },
});

// Presence represents the properties that exist on every user in the Room
type Presence = {
  // Define your presence properties here
};

// Optionally, Storage represents the shared document that persists in the Room
type Storage = {
  canvasObjects: LiveMap<string, any>;
};

// Optionally, UserMeta represents static/readonly metadata on each user
type UserMeta = {
  // Define any static user metadata here
};

// Optionally, the type of custom events broadcast and listened to in this room
type RoomEvent = {
  // Define your custom event types here
};

// Optionally, when using Comments, ThreadMetadata represents metadata on each thread
export type ThreadMetadata = {
  resolved: boolean;
  zIndex: number;
  time?: number;
  x: number;
  y: number;
};

// Create the room context with the client and other types
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client,
  {
    async resolveMentionSuggestions({ text, roomId }) {
      // Your logic to return userIds based on mention suggestions
      return [];
    },
  }
);
