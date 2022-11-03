package porject.project.entities;

import porject.project.services.ClientService;

public class Facades {

        private ClientService service;
        private long lastActive;

        public Facades(ClientService service, long lastActive) {
            this.service = service;
            this.lastActive = lastActive;
        }

        public ClientService getService() {
            return service;
        }

        public void setService(ClientService service) {
            this.service = service;
        }

        public long getLastActive() {
            return lastActive;
        }

        public void setLastActive(long lastActive) {
            this.lastActive = lastActive;
        }
    }

