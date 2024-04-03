import { createFileRoute } from "@tanstack/react-router";
import { useTerminateAllSessions } from "@/api/auth/hooks";
import Button from "@/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/ui/Card";
import Label from "@/ui/Label";

const Page = () => {
    const terminateAllSessionsHandler = useTerminateAllSessions();

    return (
        <Card>
            <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Use with caution.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label>Terminate All Sessions</Label>
                        <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => terminateAllSessionsHandler.mutate()}
                            loading={terminateAllSessionsHandler.isPending}
                        >
                            Terminate
                        </Button>
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label>Delete Account</Label>
                        <Button variant="destructive" size="sm">
                            Delete
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const Route = createFileRoute("/_protected/settings/danger_zone")({
    component: Page,
});
