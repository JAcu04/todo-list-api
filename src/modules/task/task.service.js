import { HttpError } from '../../utils/http-error.js';

export function createTaskService(taskRepository) {
    // El repository devuelve null; el service decide que eso es un 404
    const orNotFound = (task, id) => {
        if (!task) throw HttpError.notFound(`Task ${id} not found`);
        return task;
    };

    return {
        list: () => taskRepository.findAll(),

        async getById(id) {
            return orNotFound(await taskRepository.findById(id), id);
        },

        create: (data) => taskRepository.create(data),

        async update(id, data) {
            return orNotFound(await taskRepository.update(id, data), id);
        },

        async remove(id) {
            orNotFound(await taskRepository.remove(id), id);
        },
    };
}
