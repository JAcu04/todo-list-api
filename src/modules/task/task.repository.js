import { unwrap } from '../../lib/supabase.js';

const TABLE_NAME = 'tasks';

const TABLE_COLUMNS = 'id, title, description, done, created_at';

export function createTaskRepository(supabase) {
    return {

        // Obtener todas las tareas
        async findAll() {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .select(TABLE_COLUMNS)
                    .order('created_at', { ascending: false })
            );
        },

        // Obtener una tarea por ID
        async findById(id) {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .select(TABLE_COLUMNS)
                    .eq('id', id)
                    .maybeSingle()
            );
        }, 

        // Crear una tarea
        async create(task) {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .insert(task)
                    .select(TABLE_COLUMNS)
                    .single()
            );
        },

        // Actualizar una tarea
        async update(id, changes) {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .update(changes)
                    .eq('id', id)
                    .select(TABLE_COLUMNS)
                    .maybeSingle()
            );
        },

        // Eliminar una tarea
        async remove(id) {
            return unwrap(
                await supabase
                    .from(TABLE_NAME)
                    .delete()
                    .eq('id', id)
                    .select(TABLE_COLUMNS)
                    .maybeSingle()
            );
        }
    };
}